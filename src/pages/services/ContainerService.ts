
class ContainerService {


    getUserGreeting = () => {

        return fetch('http://localhost:8080/docker/greeting', {
            method: 'GET',
            // headers: {
            // }
        }).then(res => {
            // console.log('response ', res.body, res.formData())
            return res.text()
        })
        //     .then(res => {
        //     console.log('Next response ', res)
        //     return res;
        // })
    }
}

export default ContainerService;