declare namespace API {
  type AddUserDTO = {
    mail?: string;
  };

  type AdminCategoryPageRequest = {
    categoryId?: number;
    categoryName?: string;
    currentPage?: number;
    endTime?: string;
    pageSize?: number;
    startTime?: string;
  };

  type AdminCommentPageRequest = {
    authorId?: number;
    commentId?: number;
    commentUserId?: number;
    content?: string;
    currentPage?: number;
    endTime?: string;
    pageSize?: number;
    passageId?: number;
    startTime?: string;
  };

  type AdminPassageQueryPageRequest = {
    authorId?: number;
    currentPage?: number;
    endTime?: string;
    pageSize?: number;
    passageId?: number;
    startTime?: string;
    title?: string;
  };

  type AdminPassageVO = {
    accessTime?: string;
    authorId?: number;
    authorName?: string;
    collectNum?: number;
    commentNum?: number;
    passageId?: number;
    ptagsMap?: Record<string, any>;
    status?: number;
    thumbNum?: number;
    title?: string;
    viewNum?: number;
  };

  type AdminTagPageRequest = {
    categoryId?: number;
    currentPage?: number;
    endTime?: string;
    pageSize?: number;
    startTime?: string;
    tagId?: number;
    tagName?: string;
  };

  type AdminUserQueryPageRequest = {
    currentPage?: number;
    endTime?: string;
    mail?: string;
    pageSize?: number;
    startTime?: string;
    userId?: number;
    userName?: string;
  };

  type AdminUserVO = {
    avatarUrl?: string;
    createTime?: string;
    interestTag?: string[];
    ipAddress?: string;
    mail?: string;
    profiles?: string;
    role?: string;
    sex?: number;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userId?: number;
    userName?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseEditPassageVO_ = {
    code?: number;
    data?: EditPassageVO;
    message?: string;
  };

  type BaseResponseListAdminUserVO_ = {
    code?: number;
    data?: AdminUserVO[];
    message?: string;
  };

  type BaseResponseListCategoryAndTags_ = {
    code?: number;
    data?: CategoryAndTags[];
    message?: string;
  };

  type BaseResponseListPassageTitleVO_ = {
    code?: number;
    data?: PassageTitleVO[];
    message?: string;
  };

  type BaseResponseListTagVO_ = {
    code?: number;
    data?: TagVO[];
    message?: string;
  };

  type BaseResponseListUserVO_ = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageListAdminPassageVO_ = {
    code?: number;
    data?: PageListAdminPassageVO_;
    message?: string;
  };

  type BaseResponsePageListAdminUserVO_ = {
    code?: number;
    data?: PageListAdminUserVO_;
    message?: string;
  };

  type BaseResponsePageListCategory_ = {
    code?: number;
    data?: PageListCategory_;
    message?: string;
  };

  type BaseResponsePageListCategoryVO_ = {
    code?: number;
    data?: PageListCategoryVO_;
    message?: string;
  };

  type BaseResponsePageListCommentVO_ = {
    code?: number;
    data?: PageListCommentVO_;
    message?: string;
  };

  type BaseResponsePageListPassageInfoVO_ = {
    code?: number;
    data?: PageListPassageInfoVO_;
    message?: string;
  };

  type BaseResponsePageListTags_ = {
    code?: number;
    data?: PageListTags_;
    message?: string;
  };

  type BaseResponsePageListUserVO_ = {
    code?: number;
    data?: PageListUserVO_;
    message?: string;
  };

  type BaseResponsePassageContentVO_ = {
    code?: number;
    data?: PassageContentVO;
    message?: string;
  };

  type BaseResponsePassageInfoVO_ = {
    code?: number;
    data?: PassageInfoVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUserInfoDataVO_ = {
    code?: number;
    data?: UserInfoDataVO;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Category = {
    categoryId?: number;
    categoryName?: string;
    createTime?: string;
    description?: string;
    isDelete?: number;
    updateTime?: string;
  };

  type CategoryAndTags = {
    categoryId?: number;
    categoryName?: string;
    tagVOList?: TagVO[];
  };

  type CategoryDTO = {
    categoryId?: number;
    categoryName?: string;
    createTime?: number;
    description?: string;
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

  type collectPassageUsingPUTParams = {
    /** passageId */
    passageId: string;
  };

  type CommentDTO = {
    authorId?: number;
    commentTime?: number;
    content?: string;
    passageId?: string;
  };

  type CommentVO = {
    authorId?: number;
    avatarUrl?: string;
    canDelete?: boolean;
    commentId?: number;
    commentTime?: string;
    commentUserId?: number;
    content?: string;
    ipAddress?: string;
    passageId?: number;
    userName?: string;
  };

  type CursorCommentRequest = {
    authorId?: number;
    lastCommentId?: number;
    pageSize?: number;
    passageId?: number;
  };

  type deleteByPassageIdUsingDELETEParams = {
    /** passageId */
    passageId: number;
  };

  type deleteCategoryUsingPUTParams = {
    /** categoryId */
    categoryId: number;
  };

  type DeleteCommentDTO = {
    commentId?: number;
    passageId?: string;
  };

  type deleteTagUsingPUTParams = {
    /** tagId */
    tagId: number;
  };

  type deleteUserByIdUsingDELETEParams = {
    /** userId */
    userId: number;
  };

  type disableUserUsingGETParams = {
    /** userId */
    userId: number;
  };

  type EditPassageVO = {
    content?: string;
    passageId?: number;
    ptags?: number[];
    status?: number;
    summary?: string;
    thumbnail?: string;
    title?: string;
  };

  type followUsingPUTParams = {
    /** userId */
    userId: number;
  };

  type getEditPassageUsingGETParams = {
    /** pid */
    pid: string;
  };

  type getOtherPassagesByUserIdUsingGETParams = {
    /** uid */
    uid: number;
  };

  type getPassageContentByPassageIdUsingGETParams = {
    /** pid */
    pid: string;
    /** uid */
    uid: number;
  };

  type getPassageInfoUsingGETParams = {
    /** pid */
    pid: string;
  };

  type GetUserByIdListRequest = {
    idList?: number[];
  };

  type getUserInfoUsingGETParams = {
    /** uid */
    uid: number;
  };

  type getUserListByNameUsingGETParams = {
    /** userName */
    userName: string;
  };

  type LoginRequest = {
    mail?: string;
    password?: string;
    token?: string;
  };

  type LoginUserVO = {
    avatarUrl?: string;
    createTime?: string;
    interestTag?: string[];
    ipAddress?: string;
    mail?: string;
    profiles?: string;
    role?: string;
    sex?: number;
    token?: string;
    userId?: number;
    userName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageListAdminPassageVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AdminPassageVO[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageListAdminUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AdminUserVO[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageListCategory_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Category[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageListCategoryVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CategoryVO[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageListCommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CommentVO[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageListPassageInfoVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PassageInfoVO[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageListTags_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Tags[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageListUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[][];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type ParentPassageDTO = {
    content?: string;
    passageId?: string;
    publishTime?: number;
    status?: number;
    summary?: string;
    tagIdList?: number[];
    thumbnail?: string;
    title?: string;
  };

  type PassageContentVO = {
    authorId?: number;
    content?: string;
    passageId?: string;
  };

  type PassageInfoVO = {
    accessTime?: string;
    authorId?: number;
    authorName?: string;
    avatarUrl?: string;
    collectNum?: number;
    commentNum?: number;
    isCollect?: boolean;
    isPrivate?: number;
    isThumb?: boolean;
    passageId?: number;
    ptagsMap?: Record<string, any>;
    status?: number;
    summary?: string;
    thumbNum?: number;
    thumbnail?: string;
    title?: string;
    viewNum?: number;
  };

  type PassageTitleVO = {
    authorId?: number;
    passageId?: number;
    title?: string;
  };

  type publishPassageUsingGETParams = {
    /** passageId */
    passageId: string;
  };

  type QueryPageRequest = {
    currentPage?: number;
    pageSize?: number;
  };

  type RegisterCodeRequest = {
    mail?: string;
  };

  type RegisterRequest = {
    code?: string;
    mail?: string;
    password?: string;
    rePassword?: string;
    userName?: string;
  };

  type rejectPassageUsingGETParams = {
    /** passageId */
    passageId: string;
  };

  type SearchPassageRequest = {
    currentPage?: number;
    id?: number;
    pageSize?: number;
    searchText?: string;
    searchType?: string;
  };

  type setPassagePrivateUsingGETParams = {
    /** passageId */
    passageId: number;
  };

  type TagDTO = {
    categoryId?: number;
    createTime?: number;
    tagId?: number;
    tagName?: string;
    updateTime?: number;
  };

  type Tags = {
    categoryId?: number;
    createTime?: string;
    tagId?: number;
    tagName?: string;
    updateTime?: string;
  };

  type TagVO = {
    tagId?: number;
    tagName?: string;
  };

  type thumbPassageUsingPUTParams = {
    /** passageId */
    passageId: string;
  };

  type UpdateUserDTO = {
    avatarUrl?: string;
    interestTag?: string;
    ipAddress?: string;
    profiles?: string;
    sex?: number;
    userName?: string;
  };

  type UserInfoDataVO = {
    collectNum?: number;
    followNum?: number;
    followerNum?: number;
    passageNum?: number;
    thumbNum?: number;
  };

  type UserVO = {
    avatarUrl?: string;
    createTime?: string;
    followerNum?: number;
    interestTag?: string[];
    ipAddress?: string;
    isFollow?: boolean;
    level?: number;
    mail?: string;
    phone?: string;
    profiles?: string;
    sex?: number;
    userId?: number;
    userName?: string;
  };
}
