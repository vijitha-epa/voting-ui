
// class ContainerService {


    export const getUserGreeting = () => {
        console.log('Service got called');
        return fetch('http://0.0.0.0:8080/docker/greeting', {
            method: 'GET',
            // headers: {
            // }
        }).then(res => {
            console.log('response ', res.body, res.formData())
            return res.text()
        })
        // .then(res => {
        //     console.log('Next response ', res)
        //     return res;
        // })
        .catch(error => {
            console.log('Error response ', error)
            return " ERROR";
        })
    }
// }

// export default new ContainerService();