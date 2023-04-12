import React from "react";
import { Link } from "react-router-dom";
/*
const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [dob, setDob] = useState();
*/

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      dob: ''
    }
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value })
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  onChangePhone = (e) => {
    this.setState({ phone: e.target.value })
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  onChangeconfirmPassword = (e) => {
    this.setState({ confirm_password: e.target.value })
  }

  onChangedob = (e) => {
    this.setState({ dob: e.target.value })
  }

  onSubmit = (e) => {
    let ob = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      dob: this.state.dob
    }
    let olddata = localStorage.getItem('formdata');
    if (olddata == null) {
      olddata = []
      olddata.push(ob)
      localStorage.setItem('formdata', JSON.stringify(olddata));
    } else {
      let oldArr = JSON.parse(olddata)
      oldArr.push(ob)
      localStorage.setItem("formdata", JSON.stringify(oldArr))
      console.log(oldArr, 'hhg')
    }
    let { history } = this.props
    history.push({ pathname: "/" });
  }

  render() {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <div className="m-20 bg-white container rounded-lg max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="px-6 py-8 rounded-lg shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center" style={{ color: '#ff385c' }}>Sign up</h1>
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="fullname"
                  placeholder="Full Name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  required
                />

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                  value={this.state.email} onChange={this.onChangeEmail}
                  required
                />

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="phoneno"
                  placeholder="Phone Number"
                  value={this.state.phone} onChange={this.onChangePhone}
                />

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password"
                  value={this.state.password} onChange={this.onChangePassword}
                  required
                />
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={this.state.confirm_password} onChange={this.onChangeconfirmPassword}
                />

                <input
                  type="date"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="dob"
                  placeholder="Date of Birth"
                  value={this.state.dob} onChange={this.onChangedob}
                />
                <button
                  type="submit"
                  onClick={this.props.onRegister}
                  className="mt-10 w-full text-center py-3 rounded-lg text-white focus:outline-none my-1 hover:font-bold"
                  style={{
                    background:
                      "#ff385c",
                  }}
                >Create Account</button>
              </form>
              <div className="text-grey-dark mt-6">
                Already have an account?
                <Link to="/" className="no-underline border-b border-blue text-blue hover:font-bold" href="../login/" style={{ color: '#ff385c' }}>
                  Log in
                </Link>.
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Signup;