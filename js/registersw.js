const registration = () => {
    if('serviceWorker' in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(() => console.log('Pendaftaran ServiceWorker berhasil'))
                .catch(() => console.log('Pendaftaran ServiceWorker gagal'))
        })
    }else{
        console.log('ServiceWorker belum didukung browser ini.')
    }
}


const notification = () => {
    if('Notification' in window){
        Notification.requestPermission()
            .then(result => {
                if(result === 'denied'){
                    console.log('FITUR NOTIFIKASI TIDAK DIIJINKAN')
                    return;
                }else if (result === 'default'){
                    console.log('PENGGUNA MENUTUP KOTAK DIALOG PERMINTAAN IJIN')
                    return;
                }
                if('PushManager' in window){
                    navigator.serviceWorker.getRegistration()
                        .then(reg => {
                            reg.pushManager
                                .subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: 'BDLbwTEw93TPqVvMw0-btRuWzE8bB0jRhLLkb0qvZ-obCn5pCAg1O-CyEC-e_dIcgyiVVyJK5U28gyTpgiBJ5xU'
                                })
                                .then(sub => {
                                    console.log('Berhasil Subscribe dengan endpoint', sub.endpoint)
                                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))))
                                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))))
                                })
                                .catch(err => console.log('Tidak dapat melakukan subscribe  : ',err))
                        })
                }
            })
    }
}

export default {
    registration,
    notification
}