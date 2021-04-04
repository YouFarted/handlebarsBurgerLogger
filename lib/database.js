const mysql = require('mysql')
const fs    = require('fs')

class Database {
    constructor( config ) {
        this.config = config;
        this.connection = mysql.createConnection( config );
    }    
    connect() {
        return new Promise ( ( resolve, reject ) => {
            this.connection.connect((err) => {
                if(err) {
                    reject(err)
                }
                resolve(this.connection.threadId)
            })
        })
    }
    async seedFrom( filePath ) {
        let commands = await this.loadSeedCommandsFrom( filePath )
        
        for(let i=0; i<commands.length; ++i) {
            
            try {
                await this.query(commands[i])
            } catch(e) {
                console.error("error running seed command: "+ JSON.stringify(e))
            }
        }
    }

    loadSeedCommandsFrom( filePath ) {
        
        return new Promise ( ( resolve, reject ) => {
            // I use the stream interface to avoid loading the entire file into
            // memory at once which could be quite bad on arbitrarily large files
            const readStream = fs.createReadStream(filePath, 'utf8');
            let sqlCommandQueue = []
            let unusedLinesbuffer = []
            let finalPartialLine = ""

            readStream.on('data', function(chunk){
                chunk = finalPartialLine + chunk
                let lines = chunk.split("\n")
                // TODO fix this to give me data chunks that are split arbitrarily.
                // For now, I'll pretend it is safe to assume that chunks DO NOT
                // split lines
                let newCommand = ""
                for(let i=0; i<lines.length; ++i) {
                    let line = lines[i]
                    if(line.startsWith("##")) {
                        continue
                    }
                    newCommand += line;

                    if(newCommand.endsWith(";")) {
                        sqlCommandQueue.push(newCommand)
                        newCommand = ""
                    }
                }

            }).on('end', function(){
                if(finalPartialLine) {
                    sqlCommandQueue.push(finalPartialLine)
                }

                resolve(sqlCommandQueue)

            }).on('error', function(error){
                reject(error)
            })
        })
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

module.exports = Database;