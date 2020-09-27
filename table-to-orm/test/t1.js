const _ = require('lodash');
const s =
    [
        {
            "code": "ITRUANJIAN",
            "name": "IT/软件",
            "classification": "现代服务",
            "classificationCode": "XDFW001",
            "cities": [
                {
                    "code": "RUANJIANKAIFA",
                    "name": "软件开发",
                    "templateType": [
                        {
                            "code": "T2",
                            "name": "软件开发和互联网技术服务"
                        },
                        {
                            "code": "T10",
                            "name": "信息技术服务"
                        },
                        {
                            "code": "T11",
                            "name": "研发和技术服务"
                        }
                    ]
                },
                {
                    "code": "APPKAIFA",
                    "name": "APP开发",
                    "templateType": [
                        {
                            "code": "T2",
                            "name": "软件开发和互联网技术服务"
                        },
                        {
                            "code": "T10",
                            "name": "信息技术服务"
                        },
                        {
                            "code": "T11",
                            "name": "研发和技术服务"
                        }
                    ]
                },
                {
                    "code": "WANGZHANJIANSHE",
                    "name": "网站建设",
                    "templateType": [
                        {
                            "code": "T2",
                            "name": "软件开发和互联网技术服务"
                        },
                        {
                            "code": "T10",
                            "name": "信息技术服务"
                        },
                        {
                            "code": "T11",
                            "name": "研发和技术服务"
                        }
                    ]
                },
                {
                    "code": "WXH5",
                    "name": "微信/H5",
                    "templateType": [
                        {
                            "code": "T2",
                            "name": "软件开发和互联网技术服务"
                        },
                        {
                            "code": "T10",
                            "name": "信息技术服务"
                        },
                        {
                            "code": "T11",
                            "name": "研发和技术服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "WENHUACHUANYE",
            "name": "文化创意",
            "classification": "现代服务",
            "classificationCode": "XDFW001",
            "cities": [
                {
                    "code": "DIDUIHUIZHAN",
                    "name": "地推/会展",
                    "templateType": [
                        {
                            "code": "T1",
                            "name": "市场推广服务"
                        }
                    ]
                },
                {
                    "code": "QUDAOXIAOSHOU",
                    "name": "渠道营销",
                    "templateType": [
                        {
                            "code": "T1",
                            "name": "市场推广服务"
                        }
                    ]
                },
                {
                    "code": "MEITITOUFANG",
                    "name": "媒介投放",
                    "templateType": [
                        {
                            "code": "T1",
                            "name": "市场推广服务"
                        }
                    ]
                },
                {
                    "code": "TESEYINGXIAO",
                    "name": "特色营销",
                    "templateType": [
                        {
                            "code": "T1",
                            "name": "市场推广服务"
                        }
                    ]
                },
                {
                    "code": "LOGOSHEJI",
                    "name": "LOGO设计",
                    "templateType": [
                        {
                            "code": "T4",
                            "name": "设计服务"
                        },
                        {
                            "code": "T9",
                            "name": "文化创意服务"
                        }
                    ]
                },
                {
                    "code": "BOAZHUANGSHEJI",
                    "name": "包装设计",
                    "templateType": [
                        {
                            "code": "T4",
                            "name": "设计服务"
                        },
                        {
                            "code": "T19",
                            "name": "文化创意服务"
                        }
                    ]
                },
                {
                    "code": "GUANGGAOSHEJI",
                    "name": "广告设计",
                    "templateType": [
                        {
                            "code": "T4",
                            "name": "设计服务"
                        },
                        {
                            "code": "T19",
                            "name": "文化创意服务"
                        }
                    ]
                },
                {
                    "code": "QITASHEJI",
                    "name": "其他设计",
                    "templateType": [
                        {
                            "code": "T4",
                            "name": "设计服务"
                        },
                        {
                            "code": "T19",
                            "name": "文化创意服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "JIANZHENGZIXUN",
            "name": "鉴证咨询",
            "classification": "现代服务",
            "classificationCode": "XDFW001",
            "cities": [
                {
                    "code": "FALVZIXUN",
                    "name": "法律咨询",
                    "templateType": [
                        {
                            "code": "T7",
                            "name": "信息咨询服务"
                        }
                    ]
                },
                {
                    "code": "FANYIFUWU",
                    "name": "翻译服务",
                    "templateType": [
                        {
                            "code": "T7",
                            "name": "信息咨询服务"
                        }
                    ]
                },
                {
                    "code": "SHANWUZIXUN",
                    "name": "商务咨询",
                    "templateType": [
                        {
                            "code": "T7",
                            "name": "信息咨询服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "WULIUFUZHU",
            "name": "物流辅助",
            "classification": "现代服务",
            "classificationCode": "XDFW001",
            "cities": [
                {
                    "code": "SHOUPAIFUWU",
                    "name": "收派服务",
                    "templateType": [
                        {
                            "code": "T6",
                            "name": "物流辅助服务"
                        }
                    ]
                },
                {
                    "code": "ZHUANGXIEBANYUN",
                    "name": "装卸搬运",
                    "templateType": [
                        {
                            "code": "T6",
                            "name": "物流辅助服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "SHANGWUFUZHU",
            "name": "商务辅助",
            "classification": "现代服务",
            "classificationCode": "XDFW001",
            "cities": [
                {
                    "code": "JINGJIZHONGJIE",
                    "name": "经纪/中介",
                    "templateType": [
                        {
                            "code": "T36",
                            "name": "房产经纪服务"
                        }
                    ]
                },
                {
                    "code": "SHAGNWUGUANGLI",
                    "name": "商务管理",
                    "templateType": [
                        {
                            "code": "T15",
                            "name": "商务辅助服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "QITAXIANDAIFUWU",
            "name": "其他现代服务",
            "classification": "现代服务",
            "classificationCode": "XDFW001",
            "cities": [
                {
                    "code": "SHOUHOUFUWU",
                    "name": "售后服务",
                    "templateType": [
                        {
                            "code": "T37",
                            "name": "售后服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "JUMINRICHANG",
            "name": "居民日常",
            "classification": "生活服务",
            "classificationCode": "SHFW002",
            "cities": [
                {
                    "code": "HUNSHASHEYING",
                    "name": "婚纱摄影",
                    "templateType": [
                        {
                            "code": "Q12",
                            "name": "生活服务"
                        }
                    ]
                },
                {
                    "code": "DAIBANPAOTUI",
                    "name": "代办/跑腿",
                    "templateType": [
                        {
                            "code": "Q12",
                            "name": "生活服务"
                        }
                    ]
                },
                {
                    "code": "BAOJIEQINGXI",
                    "name": "保洁清洗",
                    "templateType": [
                        {
                            "code": "Q12",
                            "name": "生活服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "LVYOUYULE",
            "name": "旅游娱乐",
            "classification": "生活服务",
            "classificationCode": "SHFW002",
            "cities": [
                {
                    "code": "LVYOU",
                    "name": "旅游",
                    "templateType": [
                        {
                            "code": "T38",
                            "name": "旅游服务"
                        }
                    ]
                }
            ]
        },
        {
            "code": "JAOYU",
            "name": "教育",
            "classification": "生活服务",
            "classificationCode": "SHFW002",
            "cities": [
                {
                    "code": "KECHENGFUDAO",
                    "name": "课程辅导",
                    "templateType": [
                        {
                            "code": "Q5",
                            "name": "教育辅助服务"
                        }
                    ]
                }
            ]
        }
    ]

let t = [];
_.map(s, item => {
    return _.map(item.cities, i => {
        return _.map(i.templateType, j => {
            t.push(j)
        })
    })
})


console.log(_.uniqBy(t, "code"));