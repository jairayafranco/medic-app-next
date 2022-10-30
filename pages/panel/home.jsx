import axios from "axios"
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const getProfile = () => {
    axios.get('/api/profile').then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  const logout = async () => {
    await axios.post('/api/auth/logout').then(res => {
      router.reload();
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={getProfile}>Get user data</button>
      <button onClick={logout}>Logout</button>
    </>
  )
}
