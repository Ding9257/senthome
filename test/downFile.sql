-- 身份证
SELECT DISTINCT(qb_users.id ), qb_users.* FROM qb_users
LEFT JOIN qb_userrelated on qb_users.id = qb_userrelated.userId
WHERE  qb_users.pictureStatus != 0
and qb_users.userCertFrontPicture IS NOT NULL
and qb_userrelated.originalId in ('9dedf120af2340e5b0f2464d1a596517','f4e406f509a0454e94c83d46f5af6492')
and qb_userrelated.companyId  = '30933bc61b974a8abbb7ad3bfe0dc233'

-- 协议

SELECT DISTINCT(userid),downloadUrl FROM `qb_usercontract`
where customkey in ('9dedf120af2340e5b0f2464d1a596517','f4e406f509a0454e94c83d46f5af6492')
and companyId = '30933bc61b974a8abbb7ad3bfe0dc233' and status != 0