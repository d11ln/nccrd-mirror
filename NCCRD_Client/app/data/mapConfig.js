import { siteBaseURL } from '../js/config/serviceURLs.cfg'

export const MapConfig = {
    service: "http://app01.saeon.ac.za/nccrdtestapi/odata/projects/extensions.geojson",
    domain: siteBaseURL,
    IDField: "properties.id",
    toolTipTitle: "properties.name",
    toolTipFields: [
        {
            field: "data.startYear",
            alias: "Start Year"
        },
        {
            field: "data.endYear",
            alias: "End Year"
        },
        {
            field: "properties.id",
            alias: "Project ID"
        }
    ],
    styleField: "properties.typology",
    styles: [
        {
            value: 1,
            title: "Mitigation",
            default: true,
            icon: "http://app01.saeon.ac.za/dev/blue_2.png",
            anchorX: 0,
            anchorY: 8
        },
        {
            value: 2,
            title: "Adaptation",
            icon: "http://app01.saeon.ac.za/dev/green.png",
            anchorX: 0,
            anchorY: 8
        },
        {
            value: 3,
            title: "Research",
            icon: "http://app01.saeon.ac.za/dev/red.png",
            anchorX: 0,
            anchorY: 8
        }
    ]
}