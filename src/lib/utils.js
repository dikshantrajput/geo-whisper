import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const flyAndScale = (
  node,
  params = { y: -8, x: 0, start: 0.95, duration: 150 }
) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (style) => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};

function getRadiusInDegrees(radius) {
  // Earth's radius in kilometers
  const earthRadius = 6371;
  return radius / earthRadius;
}

export function getBoundingBox(lat, lon, radius) {
  /**
   * Returns the maximum and minimum latitudes and longitudes that define a bounding box
   * around the specified location and radius.
   *
   * @param {number} lat - Latitude of the location in decimal degrees.
   * @param {number} lon - Longitude of the location in decimal degrees.
   * @param {number} radius - Radius in kilometers.
   * @returns {object} An object containing `maxLat`, `maxLon`, `minLat`, and `minLon` that define the bounding box.
   */

  // Convert latitude and longitude to radians
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;

  // Calculate the angular distance covered by the radius
  const angularDistance = getRadiusInDegrees(radius);

  // Calculate the maximum latitude
  const maxLat = (latRad + angularDistance) * (180 / Math.PI);

  // Calculate the minimum latitude
  const minLat = (latRad - angularDistance) * (180 / Math.PI);

  // Calculate the maximum longitude
  const maxLon =
    (lonRad +
      Math.atan2(
        Math.sin(angularDistance) * Math.cos(latRad),
        Math.cos(angularDistance)
      )) *
    (180 / Math.PI);

  // Calculate the minimum longitude
  const minLon =
    (lonRad -
      Math.atan2(
        Math.sin(angularDistance) * Math.cos(latRad),
        Math.cos(angularDistance)
      )) *
    (180 / Math.PI);

  return { maxLatitude: maxLat, maxLongitude: maxLon, minLatitude: minLat, minLongitude: minLon };
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
}


export const calculateDistanceBetweenLocations = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1); // Convert latitude difference to radians
  const dLon = deg2rad(lon2 - lon1); // Convert longitude difference to radians

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance.toFixed(2);
}

export const formatTimestamp = (timestamp) => {
  const dateUTC = new Date(timestamp);
  const dateIST = new Date(dateUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const now = new Date();
  const diffMilliseconds = now - dateIST;
  const pluralize = (value, unit) => `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
  if (diffMilliseconds < 60 * 1000) {
    const diffSeconds = Math.round(diffMilliseconds / 1000);
    return pluralize(diffSeconds, 'second');
  } else if (diffMilliseconds < 60 * 60 * 1000) {
    const diffMinutes = Math.round(diffMilliseconds / (60 * 1000));
    return pluralize(diffMinutes, 'minute');
  } else if (diffMilliseconds < 24 * 60 * 60 * 1000) {
    const diffHours = Math.round(diffMilliseconds / (60 * 60 * 1000));
    return pluralize(diffHours, 'hour');
  } else {
    const localeOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateIST.toLocaleString(undefined, localeOptions);
  }
};

export const getUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser");
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        maximumAge: 10 * 1000,
        enableHighAccuracy: true,
      });
    });
    return { latitude: position.coords.latitude, longitude: position.coords.longitude };
  } catch (error) {
    throw error;
  }
}