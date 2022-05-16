// 로그인 페이지 레이아웃
import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import HeaderLink from './HeaderLink';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  .logo {
    font-family: sans-serif;
    font-weight: bolder;
    color: ${palette.indigo[9]};
    font-size: 1.75rem;
    //font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    //align-items: center;
  }
`;
const Spacer = styled.div`
  height: 4rem;
`;

const Header = ({ type, user }) => {
  return (
    <>
      <HeaderBlock>
        {/* <Wrapper> */}
        {type === 'teacher' && (
          <Wrapper>
            <Link to="/teacherMyPage" className="logo">
              ZIPZOOM
            </Link>
            <div className="right">
              <HeaderLink type="teacher" />
            </div>
          </Wrapper>
        )}
        {type === 'student' && (
          <Wrapper>
            <Link to="/studentMyPage" className="logo">
              ZIPZOOM
            </Link>
            <div className="right">
              <HeaderLink type="student" />
            </div>
          </Wrapper>
        )}
        {type === 'landing' && (
          <Wrapper>
            <Link to="/" className="logo">
              ZIPZOOM
            </Link>
          </Wrapper>
        )}
        {type === 'studentLogin' && (
          <Wrapper>
            <Link to="/" className="logo">
              ZIPZOOM
            </Link>
            <div className="right">
              <Button indigo to="/studentRegister">
                회원가입
              </Button>
            </div>
          </Wrapper>
        )}
        {type === 'teacherLogin' && (
          <Wrapper>
            <Link to="/" className="logo">
              ZIPZOOM
            </Link>
            <div className="right">
              <Button indigo to="/teacherRegister">
                회원가입
              </Button>
            </div>
          </Wrapper>
        )}
        {type === 'studentRegister' && (
          <Wrapper>
            <Link to="/" className="logo">
              ZIPZOOM
            </Link>
            <div className="right">
              <Button indigo to="/studentLogin">
                로그인
              </Button>
            </div>
          </Wrapper>
        )}
        {type === 'teacherRegister' && (
          <Wrapper>
            <Link to="/" className="logo">
              ZIPZOOM
            </Link>
            <div className="right">
              <Button indigo to="/teacherLogin">
                로그인
              </Button>
            </div>
          </Wrapper>
        )}
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
