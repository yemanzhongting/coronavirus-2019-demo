mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1d2VubG9uZyIsImEiOiJjazdhNGF6dzIwd3V0M21zNHU1ejZ1a3Q4In0.VkUeaPhu-uMepNBOMc_UdA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // 默认样式
    center: [74.2, 10.6],
    zoom: 1.5,
    hash: true,
});

map.on('load', () => {
    // 加载数据源
    map.addSource('coronavirus', {
        'type': 'geojson',
        'data': '../data/all.geojson'
    });

    // 添加热力图层
    map.addLayer(
        {
            'id': 'coronavirus-heat',
            'type': 'heatmap',
            'source': 'coronavirus',
            'paint': {
                // 热力权重，适用于集合图
                // Mapbox Expression https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
                'heatmap-weight': 1,
                // 全局控制热力权重
                'heatmap-intensity': 1,
                // 热力图配色范围
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.2,
                    'rgb(103,169,207)',
                    0.4,
                    'rgb(209,229,240)',
                    0.6,
                    'rgb(253,219,199)',
                    0.8,
                    'rgb(239,138,98)',
                    1,
                    'rgb(178,24,43)'
                ],
                // 每个热力点的绘制半径
                'heatmap-radius': 10,
                // 热力图的透明度
                'heatmap-opacity': 1
            }
        },
        'waterway-label'
    );
});