import axios from "axios";

export const CreateAccountService = async (email: string, password: string) => {
  var body = {
    email,
    password
  }
  await axios.post('http://localhost:8080/create-account', body)
}