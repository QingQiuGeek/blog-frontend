import { formatTimestamp } from '@/utils/utils';
import { DEFAULT_USER_AVATAR } from './URLResources';
import { UserRoleEnums } from './UserRoleEnums';

export const DEFAULT_USER: API.LoginUserVO = {
  avatarUrl: DEFAULT_USER_AVATAR,
  createTime: formatTimestamp('1000'),
  interestTag: ['萌新'],
  mail: '',
  profiles: '这个人很神秘...',
  sex: 2,
  token: '',
  userId: undefined,
  userName: '游客',
  ipAddress: 'M78星云',

  //默认游客权限
  role: UserRoleEnums.GUEST,
};
