import connect from './app/lib/mongo'

export async function register() {
    await connect()
}
