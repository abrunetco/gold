import rest from "@feathersjs/rest-client"
import axios from "axios"
import { localConfig } from "./configs"

const restClient = rest(localConfig.rest)
const transport = restClient.axios(axios.create({ url: localConfig.rest }))

export default transport