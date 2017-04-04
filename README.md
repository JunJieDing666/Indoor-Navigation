# Indoor-Navigation
Using openlayers3 to construct an indoor map and achieve the goal of indoor navigation.

这是一个搭建在微信公众号上的网页，是一个解决当下停车场中寻泊寻车难题的项目。其采用openlayers3框架搭建了室内地图，并利用iBeacon蓝牙设备结合微信获取用户当前位置信息，并实时显示在地图上，解决室内导航的难题，且精度达1.5m。里面涉及到ol3框架的使用，利用该JS框架结合ArcGIS制作室内地图，可完成地图的电子化，这方面网上资料较少，本项目可提供较为完整的代码借鉴。搭建完地图后，可利用最短路径算法结合地图制作邻接矩阵，实现路径规划的功能，当然，导航最核心的还是定位算法，本项目的定位算法因涉及专利便不公布，只介绍原理。
