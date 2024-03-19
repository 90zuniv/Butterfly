import React from 'react'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthInput } from '../../hooks/useAuthInput'
import { useConfirmPwd } from '../../hooks/useComfirmPwd'
import api from '../../constants/api'
import axios from '../../utils/axios'
import Button from '../../components/Button'
import AuthInput from '../../components/AuthInput'

export default function SignupForm() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  // 커스텀 훅 useAuthInput(타입, 초깃값, 정규식검사여부, 서버검사여부)
  const [id, setid, idMsg] = useAuthInput('id', '', true, true)
  const [email, setEmail, emailMsg] = useAuthInput('email', '', true, true)
  const [password, setPassword, passwordMsg] = useAuthInput(
    'password',
    '',
    true,
    false,
  )
  // 커스텀 훅 useConrimPwd(초깃값, 비교할 비밀번호 값)
  const [confirmPwd, setConfirmPwd, confirmPwdMsg] = useConfirmPwd('', password)

  // 회원가입 api 요청
  const signup = () => {
    // 모든 정보를 유효하게 입력했는지 확인
    if (
      !idMsg.isValid ||
      !emailMsg.isValid ||
      !passwordMsg.isValid ||
      !confirmPwdMsg.isValid
    ) {
      alert('입력 양식을 모두 유효하게 입력해주세요')
      return
    }
    const data = {
      id,
      email,
      password,
    }
    const [url, method] = api('signup')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        navigate('/auth/login')
      })
      .catch((err) => {
        alert('회원가입에 실패했습니다.')
      })
  }

  return (
    <Container>
      <h1>Signup</h1>
      <p>If you already have an account</p>
      <Link to="/login" className="pass bold" weight="500">
        Login here!
      </Link>
      <Form>
        <AuthInput
          type="id"
          value={id}
          onChange={(e) => setid(e.target.value)}
          message={idMsg}
        ></AuthInput>
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          message={emailMsg}
        ></AuthInput>
        <AuthInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          message={passwordMsg}
        ></AuthInput>
        <AuthInput
          type="confirmPassword"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              signup()
            }
          }}
          message={confirmPwdMsg}
        ></AuthInput>
      </Form>

      <ButtonContainer>
        <Button size="medium" onClick={signup} value="회원가입"></Button>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 90%;
  height: 100%;

  @media screen and (min-width: 1024px) {
    width: 60%;
  }
`

const Form = styled.div`
  margin: 3em 0rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
