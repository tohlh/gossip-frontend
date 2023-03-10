import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RouteGuard from './components/RouteGuard';
import { hasAuthToken } from './utils/auth';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Layout from './pages/layout';
import Post from './pages/post';
import Posts from './pages/posts';
import AddPost from './pages/addPost';
import EditPost from './pages/editPost';
import UserProfile from './pages/userProfile';
import EditComment from './pages/editComment';
import AccountSettings from './pages/accountSettings';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RouteGuard pred={!hasAuthToken()} element={<Signin />} redirect="/" />} />
        <Route path="/signup" element={<RouteGuard pred={!hasAuthToken()} element={<Signup />} redirect="/" />} />

        <Route path="/" element={<RouteGuard pred={hasAuthToken()} element={<Layout />} redirect="/login" />} >
          <Route index element={<Posts />} />
          <Route path="/post/create" element={<AddPost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/post/:id" element={<EditPost />} />
          <Route path="/edit/comment/" element={<EditComment />} />
          <Route path="/tag/:tag" element={<Posts />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/account" element={<AccountSettings />} />
          <Route path="*" element={<Navigate to={{ pathname: "/" }} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
