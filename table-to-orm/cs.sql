-- 承接关系变更为新下发公司
update cs_project_accept set companyId = '4aec803c91694129ad9295191c4ec457',companyName = '烟台昆盈网络科技有限责任公司' where projectId in (
select flowNo from cs_project where customKey = 'd48e01edac2c49419dff0bfdf3abe67a'
) and companyId = '3ccda70cafcc41e9a5f2f109f2a0c26a' and companyId != '4aec803c91694129ad9295191c4ec457' and status = 1;

-- 转分包变更为新下发公司
update cs_project_zfb set companyId = '4aec803c91694129ad9295191c4ec457',companyName = '烟台昆盈网络科技有限责任公司' where  customkey = 'd48e01edac2c49419dff0bfdf3abe67a' and companyId = '3ccda70cafcc41e9a5f2f109f2a0c26a' and companyId != '4aec803c91694129ad9295191c4ec457' and status = 1;

-- 添加项目成员
INSERT INTO cs_project_member(flowNo,projectId,projectName,zfbId,isZFB,userId,userName,certId,phoneNo,office,joinType,invoiceContent,isRealName,isSign,signUrl,memberStatus,
customKey,customName,companyId,companyName,resume,memberTaskId,memberApplyType,price,cycleType,cycleTime,locationId)
select md5(UUID()) as flowNo,projectId,projectName,zfbId,isZFB,userId,userName,certId,phoneNo,office,joinType,invoiceContent,isRealName,isSign,signUrl,memberStatus,
customKey,customName,
'4aec803c91694129ad9295191c4ec457' as companyId,'烟台昆盈网络科技有限责任公司' as companyName,
resume,memberTaskId,memberApplyType,price,cycleType,cycleTime,locationId
from cs_project_member where customkey = 'd48e01edac2c49419dff0bfdf3abe67a' and companyId = '3ccda70cafcc41e9a5f2f109f2a0c26a' and companyId != '4aec803c91694129ad9295191c4ec457' and isSign = 1 and status = 1;

-- 原下发公司成员失效
update cs_project_member set status = 0 where customkey = 'd48e01edac2c49419dff0bfdf3abe67a' and companyId = '3ccda70cafcc41e9a5f2f109f2a0c26a' and companyId != '4aec803c91694129ad9295191c4ec457' and isSign = 1 and status = 1;

-- 添加个人任务
INSERT INTO cs_member_task(flowNo,projectId,projectName,userId,userName,certId,zfbId,isZfb,signUrl,isSign,taskStatus,taskTime,applyStatus,taskPrice,office,applyType,cycleType,
cycleTime,customKey,customName,locationId,companyId,companyName)
SELECT md5(UUID()) as flowNo,projectId,projectName,userId,userName,certId,zfbId,isZfb,signUrl,isSign,taskStatus,taskTime,applyStatus,taskPrice,office,applyType,cycleType,
cycleTime,customKey,customName,locationId,
'4aec803c91694129ad9295191c4ec457' as companyId,'烟台昆盈网络科技有限责任公司' as companyName
from cs_member_task where  customkey = 'd48e01edac2c49419dff0bfdf3abe67a' and companyId = '3ccda70cafcc41e9a5f2f109f2a0c26a' and companyId != '4aec803c91694129ad9295191c4ec457' and isSign = 1 and status = 1;

-- 原公司个人任务作废
update cs_member_task set status = 0 where customkey = 'd48e01edac2c49419dff0bfdf3abe67a' and companyId = '3ccda70cafcc41e9a5f2f109f2a0c26a' and companyId != '4aec803c91694129ad9295191c4ec457' and isSign = 1 and status = 1;

-- 关联项目成员与个人任务
update cs_project_member,cs_member_task set cs_project_member.memberTaskId = cs_member_task.flowNo
where cs_project_member.certId = cs_member_task.certId and cs_project_member.projectId = cs_member_task.projectId
and cs_project_member.customKey = cs_member_task.customKey
and cs_project_member.customKey = 'd48e01edac2c49419dff0bfdf3abe67a' and cs_project_member.companyId = '4aec803c91694129ad9295191c4ec457'
and cs_project_member.companyId = cs_member_task.companyId and cs_project_member.isSign = 1;



商户 25d55d0387284e3ab7694493b36c3249  to   d48e01edac2c49419dff0bfdf3abe67a
原    rizhao  to   3ccda70cafcc41e9a5f2f109f2a0c26a
新    30933bc61b974a8abbb7ad3bfe0dc233   to   4aec803c91694129ad9295191c4ec457
东润金石（山东）文化信息咨询有限公司    to      烟台昆盈网络科技有限责任公司