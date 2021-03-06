# 室内导航系统（Indoor-Navigation)
**Using openlayers3 to construct an indoor map and achieve the goal of indoor navigation.**

&emsp;&emsp;近年来，我国机动车保有量迅速增长，为了解决停车难题，城市兴建了大量的地下停车场，并不断扩大其规模。在此情况下，地下停车场中“停车难、找车难、缴费难”的问题日益突出。由于室内环境复杂多变，建筑物遮挡了卫星信号，传统的室外定位导航技术无法满足地下停车场中高精度的定位需求，因此，开发一种低成本、部署简单、使用方便的地下停车场定位导航系统已迫在眉睫。

&emsp;&emsp;本项目旨在解决地下停车场中“停车难”、“找车难”、“缴费难”的问题，利用GIS地图绘制工结合**openlayers3框架**搭建了电子化的室内地图，并利用**iBeacon蓝牙设备**结合行人航迹推算算法，取长补短，开发出一种较高精度的融合室内定位方法，其中结合了行人航迹推算算法后**定位精度可达1m左右**。同时，针对多层导航，结合室内电子地图设计出了一种基于**人车分流**思想的地下停车场多楼层导航方法。最后，基于微信公众平台，结合电子地图及蓝牙硬件设备等实现地下停车场中实时定位导航、快速正向寻泊、反向寻车及不停车缴费等功能，给用户提供更加智能便捷的停车环境，并实现地下停车场运行的智能化、高效化、安全化。

&emsp;&emsp;项目代码里面涉及到ol3框架的使用，利用该JS框架结合ArcGIS制作的室内地图，可完成地图的电子化，这方面网上资料较少，本项目可提供较为完整的代码借鉴。搭建完地图后，可利用最短路径算法结合地图制作邻接矩阵，实现路径规划的功能，当然，导航最核心的还是定位算法，本项目的定位算法因涉及专利便不公布，只介绍原理。
