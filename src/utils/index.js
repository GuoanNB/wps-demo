import axios from "axios";
import { useEffect, useState, useCallback } from 'react'

const baseUrl = "https://intelligencedemo.azurewebsites.net"

export const getTopHeadlines = () => {
    return axios({
        method: "GET",
        url: `${baseUrl}/api/TopHeadlines?code=vc8imPqI41TNXbJbTJy6XfPZFfkMvB9MAcedxGXAk_7rAzFuNBb6mQ==`,
    })
}

export const getSuggestionTitle = (data = {}) => {
    return axios({
        method: "post",
        url: `${baseUrl}/api/HeadlineGenerator?code=nVpizfE_LmVSq-PttSHSePTy-Vu0edcgu-kY46AODWyNAzFudG5aGw==`,
        data,
    })
}

export const getTredingTopics = (data = {}) => {
    return axios.get(`${baseUrl}/api/TrendTopic?code=JOxznCL1isopyfZnUCgYrtD7H79Qe_58rBeS5XctdL6PAzFu_yjkNw==`, {
        params: data,
    })
}

export const getRecently7days = () => {
    let days = [];
    for(let i = 1; i < 7; i++) {
        days.push(getFormatDay(i))
    }
    return days;
}

const getFormatDay = (num) => {
    let dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() - num)
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = (date.getMonth()+1 <= 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    const displayMonth = date.getMonth()+1;
    const day = (date.getDate() + 1 <= 10 ? '0' + (date.getDate()) : date.getDate());
    const displayDay = date.getDate() + ' ';
    const yDate = year + '-' + month + '-'+day
    let displayDate;
    if(num === 1) {
        displayDate = 'Today'
    } else if(num === 2) {
        displayDate = 'Yesterday'
    } else {
        displayDate = displayMonth + '/' + displayDay
    }
    return { yDate, displayDate }
}
export const useSyncCallback = callback => {
    const [proxyState, setProxyState] = useState({ current: false })

    const Func = useCallback(() => {
        setProxyState({ current: true })
    }, [proxyState])

    useEffect(() => {
        if (proxyState.current === true) setProxyState({ current: false })
    }, [proxyState])

    useEffect(() => {
        proxyState.current && callback()
    })

    return Func
}
export const sampleContentList = [
    `Ask me the "must-see" attraction in my neck of the woods, and I'll tell you it's Amicalola Falls . Amicalola Falls is a popular state park and is part of the Georgia State Parks system with the highest cascading waterfall east of the Mississippi River. It's located in the North Georgia mountains within the Chattahoochee National Forest and is where the Appalachian Trail begins. HIKE AMICALOLA FALLS STATE PARK WITH YOUNG CHILDREN You can start at the bottom, the top, or the middle. If you have little ones (like me) then I recommend parking at the West Ridge Access Trail and making this middle section your starting point. You'll follow the paved path to the bridge overlooking the falls (it's only .3 miles to the bridge.) This is a fantastic view!\nIf you are up for it, take the blue blazed trail down 165 stairs, and a total of 1 mile; this trail leads to a reflection pool at the base of the falls. It will follow the creek almost the entire way, with great places to play in the water and see the beautiful view of rhododendron and other native flora. I did it with my 5 yr old and the toddler in a sling. I'm not going to say that was "easy," but it was very doable. I'd do it again without hesitation. With older kids, this is a no-brainer. You might even venture UP from the middle bridge. A little over 400 stairs takes you to the top of the falls where you'll find the Amicalola Falls Lodge where you cool off in the heat of the summer. The faint-of-heart (or faint-of-breath) can also drive to the top for gorgeous views. Don't have young kids? Read on for Sue's experience with tweens and teens. HIKE AMICALOLA FALLS STATE PARK WITH TWEENS AND TEENS Sue tackled the entire climb from bottom to top with tweens. They conquered the 620 steps to the summit   175 to the viewing area and then another 445 to the top. The hiking trails aren't too bad and there were lots of places to rest along the way if needed. The tumbling water of the falls are beautiful and look like icicles falling down the mountain. The top affords a gorgeous view of the valley below. AMICALOLA FALLS STATE PARK LODGE While you are at the top of the mountain, stop into the Amicalola Lodge for a view of the enormous fireplace and vista view through the picture window. The porch out back has wooden rocking chairs that call your name! There is also the Maple Restaurant , a full-service restaurant at the Amicalola Falls State Park Lodge that is known for its Sunday brunch. Have lunch at the lodge, or take a picnic at the reflection pool at the base of the falls. The Visitor Center is a fun stop for kids, with various live and taxidermy'd animals. AMICALOLA FALLS CAMPING AND COTTAGES There is also camping and cottages (2 of which are dog friendly) Sue visited the park with her older boys and camped, enjoying a typical evening of roasted hot dogs, s'mores and enough extra toasted marshmallows to build a Stay Puff Marshmallow Man. There are 25 camping sites at Amicalola Falls State Park and 14 cottages, plus some very special accommodations. LEN FOOTE HIKE INN In addition to camping and rooms at the Amicalola Lodge, there is another unique lodging option called the Len Foote Hike Inn . The only way to reach the Inn is on foot. It's five miles of great hiking to Len Foote Inn, which is fairly rustic, but stunningly beautiful. Read about our trip (with LOTS of pictures) here .\nAlso, the first bit of the trail is both a trail for the Hike Inn, and the Appalachian connector approach trail that leads to Springer Mountain, the southern terminus of the AT. Kinda cool. JUNIOR RANGER PROGRAMS AT AMICALOLA STATE PARK Be sure to check the calendar before heading out to Amicalola Falls to see what Ranger programs are available during your visit. We attended a ranger talk once, featuring several owls. It was informative and fun, and the kids loved it. They also have programs on hiking, snakes, and more. In addition to the ranger program, there is a playground, and geocaching. Enough to keep you busy all day! Sue's trip included a Ranger led creek walk. Before the walk they explored the snakes in the visitor's center, even touching one slithering through a volunteer's shirt before grabbing the nets provided and heading to the creek. Nets are a great thing to bring with you on a trip to any of the state parks in Ga. Kids love splashing around in the water and trying to catch little critters. Another tip for Amicalola State Park   bring a few extra dollars, the visitor's center has an ice cream machine:) As soon as Sue's group reached the creek, they noticed a native snake sunning on a log. Not to disturb him, the group moved a bit farther down the creek. A Park Ranger accompanied the group and immediately sent everyone out to find crawfish, water sliders and a number a creepy crawly things whose names I have purposely forgotten. All the kids (and adults) had a blast getting wet and dirty and seeing who could find the biggest crawfish. Be sure to bring your Junior Ranger books , to get a few criteria marked off.\nWANT TO HIKE MORE? We mentioned that Amicalola Falls State Park & Lodge is where the Appalachian Trails Stone Archway marks the start of the Appalachian Trail. Hike from the crest of Amicalola Falls Park to Springer Mountain . This 15.5-mile roundtrip makes for a challenging day hike, an even better overnight backpacking adventure, or the ultimate start to a thru-hike on the Appalachian Trail to Maine. FUN NEAR THE LODGE AT AMICALOLA FALLS One great thing about Amicalola Falls State Park & Lodge is its location. It's only about two hours from Atlanta. If you want to visit other popular North Georgia towns within the Appalachian Mountains like Dahlonega , Helen , Blue Ridge, Hiawassee or Ellijay , they are all within an hour of Amicalola Falls. Another fun place to go near Amicalola is Unicoi State Park & Lodge , which offers zip-lining through the North Georgia mountain tops.`
]
export const newsLetterList = [
    {
        title: "Ownership",
        subTitle: "Fully control of contents and subscribers",
        img: "audience0",
        description: [
            "Create what you want and what your audience loves. You don't have to conform to popular taste",
            "Make your audience the private property"
        ]
    },
    {
        title: "Grow",
        subTitle: "Grow audience with global Microsoft users",
        img: "audience1",
        description: [
            "Promote your content and grow your audience on Microsoft surfaces, Windows, Outlook, Edge, Bing. Be prepared for your global fans!"
        ]
    },
    {
        title: "Free",
        subTitle: "Free to use with extra bonus on your growth",
        img: "audience2",
        description: [
            "Free to use before you gain first $100,000",
            "$100 bonus on your growth milestones"
        ]
    },
    {
        title: "Income",
        subTitle: "Reoccurring income on subscription",
        img: "audience3",
        description: [
            "Stop rolling the dice of ad revenue and per-stream payouts. Get recurring income through monthly payments from your subscribers",
            "Supporting 16 currencies across 108 regions"
        ]
    }
]
export const discordList = [
    {
        title: "Secure",
        subTitle: "Secure your followers into private property",
        img: "audience4",
        description: [
            "Migrate your followers to de-centralized and democratic web where you have more control with little platforms intervene"
        ]
    },
    {
        title: "Paid community",
        subTitle: "Build your paid Discord server",
        img: "audience5",
        description: [
            "Set up a price for your private Discord servers, you make income and make your audience happier.",
            "NFT payment tap your business early to Web3"
        ]
    }
]
export const tableData = [
    {
        "Topic": "Family Day",
        "SearchVolumn": {
            "Score": 600000,
            "Signal": "Up" //Enum: Up, Down, New, None
        },
        "MsnContentSupply": "Scarce", // Enum: Scarce, Moderate, Sarurated
        "Items": [{
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },{
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        }
    ]
    },
    {
        "Topic": "US President Election Donald Trump lose",
        "SearchVolumn": {
            "Score": 513103,
            "Signal": "New" //Enum: Up, Down, New, None
        },
        "MsnContentSupply": "Moderate", // Enum: Scarce, Moderate, Sarurated
        "Items": [
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },{
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            }
    ]
    },
    {
        "Topic": "US President Election Donald Trump lose",
        "SearchVolumn": {
            "Score": 513103,
            "Signal": "Down" //Enum: Up, Down, New, None
        },
        "MsnContentSupply": "Saturated", // Enum: Scarce, Moderate, Sarurated
        "Items": [
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },{
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            },
            {
                "Title": "How to Write Content About Your Photographs",
                "Source": "MSN",
                "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
                "DocLink": "https://www.baidu.com"
            }
    ]
    },
    {
        "Topic": "Family Day",
        "SearchVolumn": {
            "Score": 600000,
            "Signal": "Down" //Enum: Up, Down, New, None
        },
        "MsnContentSupply": "Scarce", // Enum: Scarce, Moderate, Sarurated
        "Items": [{
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },{
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        }
    ]
    },
    {
        "Topic": "Family Day",
        "SearchVolumn": {
            "Score": 600000,
            "Signal": "None" //Enum: Up, Down, New, None
        },
        "MsnContentSupply": "Scarce", // Enum: Scarce, Moderate, Sarurated
        "Items": [{
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },{
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        },
        {
            "Title": "How to Write Content About Your Photographs",
            "Source": "MSN",
            "ImgUrl": "https://intelligencedemo.azureedge.net/demo/4.png",
            "DocLink": "https://www.baidu.com"
        }
    ]
    }
]