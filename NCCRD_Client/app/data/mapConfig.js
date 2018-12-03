export const MapConfig = {
    "service": "http://app01.saeon.ac.za/nccrdapi/odata/projects/extensions.geojson",
    "domain": "http://app01.saeon.ac.za",
    "IDField": "properties.id",
    "toolTipTitle": "properties.name",
    "toolTipFields": [
        {
            "field": "data.startYear",
            "alias": "Start Year"
        },
        {
            "field": "data.endYear",
            "alias": "End Year"
        }
    ],
    "styleField": "properties.id",
    "styles": [
        {
            "value": 0,
            "title": "id",
            "default": true,
            "icon": "http://app01.saeon.ac.za/dev/red.png",
            "anchorX": 8,
            "anchorY": 8
        },
        // {
        //     "value": 1,
        //     "title": "Typology 1",
        //     "icon": "http://app01.saeon.ac.za/dev/blue.png",
        //     "anchorX": 8,
        //     "anchorY": 8
        // }
    ]
}