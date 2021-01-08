const FtpSvr = require ( 'ftp-srv' );
var path = require('path');

const hostname = '127.0.0.1';
const port = 81;

const ftpServer = new FtpSvr ( 'ftp://' + hostname + ':' + port,
{ anonymous: true, greeting : [ "Hello Jong", "Wie gehts?" ] } );

ftpServer.on ( 'login', ( { connection, username, password }, resolve, reject ) =>
{
  user = 'sam';
  pass = '1234';



  if (username === user && password === pass) { 
    // If connected, add a handler to confirm file uploads 
    connection.on('STOR', (error, fileName) => { 
      if (error) { 
        console.error(`FTP server error: could not receive file ${fileName} for upload ${error}`); 
      } 
      console.info(`FTP server: upload successfully received - ${fileName}`); 
    }); 

    var server_Root = path.join(__dirname + '/ftp/');
   // server_Root =   server_Root.replace('C:', '');
    server_Root = server_Root.split(":").pop();
    server_Root =  server_Root.replace(/\\/g, '/');
   // console.log(server_Root);
    resolve({root: server_Root})
  } else { 
    reject(new Error('Unable to authenticate with FTP server: bad username or password')); 
  } 



});

ftpServer.on ( 'client-error', (connection, context, error) =>
{
//   console.log ( 'connection: '    connection );
//   console.log ( 'context: '       context );
//   console.log ( 'error: '         error );
});


ftpServer.listen()
.then(() =>
{
  console.log ( `Server running at http://${hostname}:${port}/` );
});