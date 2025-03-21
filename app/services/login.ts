import axios from "axios";

export const LoginService = async (email: string, password: string) => {
  var body = {
    email,
    password
  }
  await axios.post('http://localhost:8080/login', body)
}