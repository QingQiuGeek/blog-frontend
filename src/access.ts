import { DEFAULT_USER } from './constants/DefaultUser';
import { decrypt } from './utils/utils';

export default () => {
  let user = DEFAULT_USER;

  const loginUserEncrypt = localStorage.getItem('loginUser');
  if (loginUserEncrypt) {
    user = decrypt(loginUserEncrypt);
    // setInitialState(loginUser);
  }
  // const loginUser: API.LoginUserVO = useSelector(
  //   (state) => state.loginUser.loginUser,
  // );
  // const { initialState, setInitialState } = useModel('@@initialState');

  // setInitialState(DEFAULT_USER);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // 监听用户登录操作
  //   dispatch({
  //     type: 'loginUser/LoginUser',
  //     payload: {
  //       // 登录成功后，将用户信息保存到initialState中
  //       onSuccess: (user) => {
  //         initialState.user = user;
  //       },
  //     },
  //   });
  // }, []);

  //为空就赋给一个空对象
  const { role } = user;
  // console.log(loginUser);

  // console.log('role：' + role);
  const isAdmin = role === 'admin';
  // 判断是否为已登录用户（如果没有有效的登录信息且无userId，认为是 guest）
  const isUser = role === 'user';

  return {
    canAdmin: isAdmin,
    canUser: isUser,
  };
};
