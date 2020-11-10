import database from './db.js'

const getAllTeam = () => {
    
    database.getTeam()
        .then(data => {
            let teamsHTML = ''
            data.forEach(team => {
                teamsHTML  +=
                `
                <div class="col s12">
                    <div class="card">
                    <div class="card-content row valign-wrapper">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                        </div>
                        <div class="col s8 information-team">
                        <span class="badge-blue"><strong>${team.name}</strong></span>
                        <span>${team.venue}</span>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                        <button onclick="deleteFavoriteTeam(${team.id},'${team.name}')" class="btn-floating btn-large red">DELETE</button>
                    </div>
                    </div>
                </div>
                `
            })
           
            document.getElementById('favoriteTeams').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addFavoriteTeam = (id,logo,name,venue,website) => {
    
    database.addTeam({id,logo,name,venue,website})
   
    M.toast({html: `Berhasil Menambah Tim ${name} pada Daftar Favorite`, classes: 'rounded'});
    
    pushNotification(`Berhasil Menambah Tim ${name} pada Daftar Favorite`)
}

const deleteFavoriteTeam = (id,name) => {
  
    let imSure = confirm(`Apakah Anda Yakin ingin menghapus Tim ${name} dari Daftar Favorite ?`)
    if(imSure){
        
        database.deleteTeam(id)
        
        getAllTeam()
        
        M.toast({html: `Berhasil Menghapus Tim ${name}`, classes: 'rounded'})
        
        pushNotification(`Berhasil Menghapus Tim ${name}`)
    }
    
}

export default {
    addFavoriteTeam,
    getAllTeam,
    deleteFavoriteTeam
}