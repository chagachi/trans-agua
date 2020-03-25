'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ request, response, auth}) {
        try{

            if(auth.user.adm == 1) {

                const data = request.only(["username", "email", "password", "adm"])

                const user = await User.create(data)

                return user

        }

        response.status(300).send({message:'Você não tem privilégios administrativos.'})


        } catch(err){
            return response.status(500).send({ error: `Erro: ${err.message}` })
        }
    }

    async login({ request, response, auth }) {
        try {

            const {username, password} = request.all()

            const validaToken = await auth.attempt(username, password)

            return validaToken

        } catch(err){
            return response.status(500).send({ error: `Erro: ${err.message}` })
        }
    }

    async update ({ params, request, response, auth }) {

        if(auth.user.adm == 1){
            const {username, email, password, adm, status} = request.all()
            const user = await User.query().where('id', params.id).first()

            if(!user){
                return response.status(400).send({message: 'Nenhum registro encontrado.'})
            }

            user.username = username
            user.email = email
            user.password = password
            user.adm = adm
            user.status = status

            await user.save()

            return user
        }

        const {username, email, password} = request.all()
        const user = await User.query().where('id', auth.user.id).first()

        user.username = username
        user.email = email
        user.password = password

        await user.save()

        return user

    }

    async index({request, response, auth}) {

        if(auth.user.adm == 1){
            const user = await User.all()

            return user
        }

        const user = await User.query().where('id', auth.user.id).first()

        return user

    }

    async show({params, request, response, auth}) {

        const idAutenticado = (auth.user.adm == 1) ? params.id : auth.user.id
        const user = await User.query().where('id', idAutenticado).first()

        if (!user) {
            return response.status(400).send({message: 'Nenhum usuário encontrado.'})
        }
        return user

    }
}

module.exports = UserController
