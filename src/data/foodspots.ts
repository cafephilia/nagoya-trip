import type { FoodSpot } from '../types'
import raw from './foodspots.json'

// SNS·유튜브에서 유명한 나고야 맛집. 2026-10 조사 기준
export const FOOD_SPOTS = raw as FoodSpot[]
