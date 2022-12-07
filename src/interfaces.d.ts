// TODO: move non-one-off interfaces here!
export interface Stop {
  id: string
  stop_id: string
  stop_code: string
  stop_name: string
  stop_desc: string
  stop_lat: string
  stop_lon: string
  stop_street: string
  stop_city: string
  stop_region: string
  stop_postcode: string
  stop_country: string
  zone_id: string
}

export interface Bus {
  route_color: string
  route_desc: string
  route_id: string
  route_long_name: string
  route_short_name: string
  route_text_color: string
  route_type: string
  route_url: string
}

export interface Trip {
  route_id: string
  service_id: string
  trip_id: string
  trip_headsign: string
  direction_id: string
  block_id: string
  shape_id: string
}

/* export interface Route {
  id: string
  route_id: string
  route_short_name: string
  route_long_name: string
  route_desc: string
  route_type: string
} */

// Routes and Trips from GetRouteSummaryForStopResult API call aren't consistent with GTFS
export interface Route {
  RouteNo: string
  RouteHeading: string
  DirectionID: number
  Direction: string
  Trips: { Trip: TimedTrip[] } | TimedTrip[]
}

// Routes and Trips from GetRouteSummaryForStopResult API call aren't consistent with GTFS
export interface TimedTrip {
  Longitude: string
  Latitude: string
  GPSSpeed: string
  TripDestination: string
  TripStartTime: string
  AdjustedScheduleTime: string
  AdjustmentAge: string
  LastTripOfSchedule: boolean
  BusType: string
}

export interface GtfsStopQuery {
  Query?: object
  Gtfs?: Stop[]
}
export interface GtfsTripQuery {
  Query?: object
  Gtfs?: Trip[]
}

export interface GtfsRouteQuery {
  Query?: object
  Gtfs?: Route[]
}
