declare namespace API {
  type AddUserDTO = {
    mail?: string;
  };

  type AdminCategoryPageRequest = {
    currentPage?: number;
    pageSize?: number;
    categoryName?: string;
    categoryId?: number;
    startTime?: string;
    endTime?: string;
  };

  type AdminCommentPageRequest = {
    currentPage?: number;
    pageSize?: number;
    commentId?: number;
    content?: string;
    authorId?: number;
    commentUserId?: number;
    passageId?: number;
    startTime?: string;
    endTime?: string;
  };

  type AdminPassageQueryPageRequest = {
    currentPage?: number;
    pageSize?: number;
    title?: string;
    authorId?: number;
    passageId?: number;
    startTime?: string;
    endTime?: string;
  };

  type AdminPassageVO = {
    passageId?: number;
    authorId?: number;
    authorName?: string;
    title?: string;
    viewNum?: number;
    commentNum?: number;
    thumbNum?: number;
    collectNum?: number;
    accessTime?: string;
    status?: number;
    ptagsMap?: Record<string, any>;
  };

  type AdminTagPageRequest = {
    currentPage?: number;
    pageSize?: number;
    tagName?: string;
    tagId?: number;
    categoryId?: number;
    startTime?: string;
    endTime?: string;
  };

  type AdminUserQueryPageRequest = {
    currentPage?: number;
    pageSize?: number;
    userName?: string;
    userId?: number;
    endTime?: string;
    startTime?: string;
  };

  type AdminUserVO = {
    userId?: number;
    avatarUrl?: string;
    sex?: number;
    profiles?: string;
    interestTag?: string[];
    ipAddress?: string;
    userName?: string;
    role?: string;
    createTime?: string;
    updateTime?: string;
    status?: number;
  };

  type BRBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BREditPassageVO = {
    code?: number;
    data?: EditPassageVO;
    message?: string;
  };

  type BRListAdminUserVO = {
    code?: number;
    data?: AdminUserVO[];
    message?: string;
  };

  type BRListCategoryAndTags = {
    code?: number;
    data?: CategoryAndTags[];
    message?: string;
  };

  type BRListPassageTitleVO = {
    code?: number;
    data?: PassageTitleVO[];
    message?: string;
  };

  type BRListTagVO = {
    code?: number;
    data?: TagVO[];
    message?: string;
  };

  type BRListUserVO = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BRLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BRLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BRPageListAdminPassageVO = {
    code?: number;
    data?: PageListAdminPassageVO;
    message?: string;
  };

  type BRPageListAdminUserVO = {
    code?: number;
    data?: PageListAdminUserVO;
    message?: string;
  };

  type BRPageListCategory = {
    code?: number;
    data?: PageListCategory;
    message?: string;
  };

  type BRPageListCategoryVO = {
    code?: number;
    data?: PageListCategoryVO;
    message?: string;
  };

  type BRPageListCommentVO = {
    code?: number;
    data?: PageListCommentVO;
    message?: string;
  };

  type BRPageListPassageInfoVO = {
    code?: number;
    data?: PageListPassageInfoVO;
    message?: string;
  };

  type BRPageListTags = {
    code?: number;
    data?: PageListTags;
    message?: string;
  };

  type BRPageListUserVO = {
    code?: number;
    data?: PageListUserVO;
    message?: string;
  };

  type BRPassageContentVO = {
    code?: number;
    data?: PassageContentVO;
    message?: string;
  };

  type BRPassageInfoVO = {
    code?: number;
    data?: PassageInfoVO;
    message?: string;
  };

  type BRString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BRUserInfoDataVO = {
    code?: number;
    data?: UserInfoDataVO;
    message?: string;
  };

  type BRUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Category = {
    categoryId?: number;
    categoryName?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type CategoryAndTags = {
    categoryId?: number;
    categoryName?: string;
    tagVOList?: TagVO[];
  };

  type CategoryDTO = {
    categoryId?: number;
    categoryName?: string;
    description?: string;
    createTime?: number;
    updateTime?: number;
  };

  type CategoryPageRequest = {
    currentPage?: number;
    pageSize?: number;
  };

  type CategoryVO = {
    categoryId?: number;
    categoryName?: string;
    description?: string;
  };

  type chatSseParams = {
    msg: string;
  };

  type CommentDTO = {
    content?: string;
    passageId?: string;
    authorId?: number;
    commentTime?: number;
  };

  type CommentVO = {
    commentId?: number;
    content?: string;
    commentUserId?: number;
    passageId?: number;
    authorId?: number;
    commentTime?: string;
    userName?: string;
    avatarUrl?: string;
    ipAddress?: string;
    canDelete?: boolean;
  };

  type CursorCommentRequest = {
    authorId?: number;
    passageId?: number;
    lastCommentId?: number;
    pageSize?: number;
  };

  type DeleteCommentDTO = {
    passageId?: string;
    commentId?: number;
  };

  type EditPassageVO = {
    passageId?: number;
    title?: string;
    thumbnail?: string;
    summary?: string;
    content?: string;
    status?: number;
    ptags?: number[];
  };

  type GetUserByIdListRequest = {
    idList?: number[];
  };

  type LoginRequest = {
    token?: string;
    password?: string;
    mail?: string;
  };

  type LoginUserVO = {
    token?: string;
    userId?: number;
    avatarUrl?: string;
    ipAddress?: string;
    sex?: number;
    profiles?: string;
    interestTag?: string[];
    userName?: string;
    mail?: string;
    role?: string;
    createTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageListAdminPassageVO = {
    records?: AdminPassageVO[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListAdminPassageVO;
    searchCount?: PageListAdminPassageVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageListAdminUserVO = {
    records?: AdminUserVO[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListAdminUserVO;
    searchCount?: PageListAdminUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageListCategory = {
    records?: Category[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListCategory;
    searchCount?: PageListCategory;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageListCategoryVO = {
    records?: CategoryVO[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListCategoryVO;
    searchCount?: PageListCategoryVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageListCommentVO = {
    records?: CommentVO[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListCommentVO;
    searchCount?: PageListCommentVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageListPassageInfoVO = {
    records?: PassageInfoVO[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListPassageInfoVO;
    searchCount?: PageListPassageInfoVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageListTags = {
    records?: Tags[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListTags;
    searchCount?: PageListTags;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageListUserVO = {
    records?: UserVO[][];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageListUserVO;
    searchCount?: PageListUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type ParentPassageDTO = {
    passageId?: string;
    publishTime?: number;
    title?: string;
    content?: string;
    thumbnail?: string;
    summary?: string;
    status?: number;
    tagIdList?: number[];
  };

  type PassageContentVO = {
    passageId?: string;
    authorId?: number;
    content?: string;
  };

  type PassageInfoVO = {
    isThumb?: boolean;
    isCollect?: boolean;
    passageId?: number;
    authorId?: number;
    authorName?: string;
    avatarUrl?: string;
    title?: string;
    thumbnail?: string;
    summary?: string;
    status?: number;
    viewNum?: number;
    commentNum?: number;
    isPrivate?: number;
    thumbNum?: number;
    collectNum?: number;
    accessTime?: string;
    ptagsMap?: Record<string, any>;
  };

  type PassageTitleVO = {
    passageId?: number;
    authorId?: number;
    title?: string;
  };

  type QueryPageRequest = {
    currentPage?: number;
    pageSize?: number;
  };

  type RegisterCodeRequest = {
    mail?: string;
  };

  type RegisterRequest = {
    password?: string;
    rePassword?: string;
    userName?: string;
    mail?: string;
    code?: string;
  };

  type SearchPassageRequest = {
    searchText?: string;
    searchType?: string;
    id?: number;
    currentPage?: number;
    pageSize?: number;
  };

  type SseEmitter = {
    timeout?: number;
  };

  type TagDTO = {
    tagId?: number;
    tagName?: string;
    categoryId?: number;
    createTime?: number;
    updateTime?: number;
  };

  type Tags = {
    tagId?: number;
    tagName?: string;
    categoryId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type TagVO = {
    tagId?: number;
    tagName?: string;
  };

  type UpdateUserDTO = {
    avatarUrl?: string;
    sex?: number;
    profiles?: string;
    interestTag?: string;
    userName?: string;
    ipAddress?: string;
  };

  type UserInfoDataVO = {
    followerNum?: number;
    collectNum?: number;
    passageNum?: number;
    followNum?: number;
    thumbNum?: number;
  };

  type UserVO = {
    isFollow?: boolean;
    userId?: number;
    avatarUrl?: string;
    sex?: number;
    profiles?: string;
    interestTag?: string[];
    followerNum?: number;
    userName?: string;
    mail?: string;
    ipAddress?: string;
    level?: number;
    createTime?: string;
  };
}
