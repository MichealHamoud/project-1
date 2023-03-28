const APIController = (function(){

    const clientId ='44c2ad3160174fc089bfbe272aa6eb71';
    const clientSecret = '5d75f019233b4757a4de12db7680508c';

        // private methods
        const _getToken = async () => {

            const result = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            });
    
            const data = await result.json();
            return data.access_token;
        }
})