# Requests

[Find properties in given area](#find-properties-in-given-area-bounding-box)

## Find properties in given area (bounding box)

This is the format of the reuqest to use

```text
http://localhost:5020/properties/in-area?minLon=<value>&minLat=<value>&maxLon=<value>&maxLat=<value>
```

Here is an example

```text
http://localhost:5020/properties/in-area?minLon=85.30&minLat=27.65&maxLon=85.40&maxLat=27.75
```

Response

```json
{
	"bounds": {
		"minLon": 85.3,
		"minLat": 27.65,
		"maxLon": 85.4,
		"maxLat": 27.75
	},
	"count": 6,
	"properties": [
		{
			"id": "1",
			"property_code": "P-001",
			"title": "Green View Plot",
			"owner_name": "Aarav",
			"property_type": "residential",
			"bedrooms": 3,
			"listed_price": "125000.00",
			"plot_geojson": {
				"type": "Polygon",
				"coordinates": [
					[
						[85.32, 27.705],
						[85.322, 27.705],
						[85.322, 27.707],
						[85.32, 27.707],
						[85.32, 27.705]
					]
				]
			},
			"centroid_geojson": {
				"type": "Point",
				"coordinates": [85.321, 27.706]
			}
		},
		{
			"id": "2",
			"property_code": "P-002",
			"title": "River Corner",
			"owner_name": "Maya",
			"property_type": "residential",
			"bedrooms": 2,
			"listed_price": "98000.00",
			"plot_geojson": {
				"type": "Polygon",
				"coordinates": [
					[
						[85.323, 27.706],
						[85.325, 27.706],
						[85.325, 27.708],
						[85.323, 27.708],
						[85.323, 27.706]
					]
				]
			},
			"centroid_geojson": {
				"type": "Point",
				"coordinates": [85.324, 27.707]
			}
		},
		{
			"id": "3",
			"property_code": "P-003",
			"title": "Market Edge Lot",
			"owner_name": "Nima",
			"property_type": "commercial",
			"bedrooms": null,
			"listed_price": "210000.00",
			"plot_geojson": {
				"type": "Polygon",
				"coordinates": [
					[
						[85.326, 27.7045],
						[85.329, 27.7045],
						[85.329, 27.707],
						[85.326, 27.707],
						[85.326, 27.7045]
					]
				]
			},
			"centroid_geojson": {
				"type": "Point",
				"coordinates": [85.3275, 27.70575]
			}
		},
		{
			"id": "4",
			"property_code": "P-004",
			"title": "Hillside Parcel",
			"owner_name": "Sita",
			"property_type": "land",
			"bedrooms": null,
			"listed_price": "87000.00",
			"plot_geojson": {
				"type": "Polygon",
				"coordinates": [
					[
						[85.318, 27.708],
						[85.3205, 27.708],
						[85.3205, 27.7105],
						[85.318, 27.7105],
						[85.318, 27.708]
					]
				]
			},
			"centroid_geojson": {
				"type": "Point",
				"coordinates": [85.31925, 27.70925]
			}
		},
		{
			"id": "5",
			"property_code": "P-005",
			"title": "City Block A",
			"owner_name": "Rohan",
			"property_type": "residential",
			"bedrooms": 4,
			"listed_price": "165000.00",
			"plot_geojson": {
				"type": "Polygon",
				"coordinates": [
					[
						[85.3215, 27.7025],
						[85.324, 27.7025],
						[85.324, 27.7045],
						[85.3215, 27.7045],
						[85.3215, 27.7025]
					]
				]
			},
			"centroid_geojson": {
				"type": "Point",
				"coordinates": [85.32275, 27.7035]
			}
		},
		{
			"id": "6",
			"property_code": "P-006",
			"title": "Office Strip",
			"owner_name": "Kiran",
			"property_type": "commercial",
			"bedrooms": null,
			"listed_price": "245000.00",
			"plot_geojson": {
				"type": "Polygon",
				"coordinates": [
					[
						[85.3295, 27.7065],
						[85.332, 27.7065],
						[85.332, 27.709],
						[85.3295, 27.709],
						[85.3295, 27.7065]
					]
				]
			},
			"centroid_geojson": {
				"type": "Point",
				"coordinates": [85.33075, 27.70775]
			}
		}
	]
}
```
