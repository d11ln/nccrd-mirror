export const MapConfig = {
    service: "http://app01.saeon.ac.za/nccrdapi/odata/projects/extensions.geojson",
    toolTipTitle: "properties.name",
    toolTipFields: [
        {
            field: "data.startYear",
            alias: "Start Year"
        },
        {
            field: "data.endYear",
            alias: "End Year"
        }
    ],
    styleField: "properties.typology",
    styles: [
        {
            value: 0,
            title: "Typology 0",
            default: true,
            icon: "http://app01.saeon.ac.za/dev/red.png",
            anchorX: 8,
            anchorY: 8
        },
        {
            value: 1,
            title: "Typology 1",
            icon: "http://app01.saeon.ac.za/dev/blue.png",
            anchorX: 8,
            anchorY: 8
        }
    ]
}