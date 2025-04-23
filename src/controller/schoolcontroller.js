const {getDistance}=require('../utils/DistanceCalc')
const pool =require("../db/db")
const AddSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body

  if (
    !name || typeof name !== 'string' ||
    !address || typeof address !== 'string' ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid or missing input fields' })
  }

  try {
    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [name, address, latitude, longitude]
    const result = await pool.query(query, values)

    res.status(201).json({
      message: 'School added successfully',
      school: result.rows[0]
    })
  } catch (error) {
    console.error('... Error inserting school', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const ListSchools = async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Please provide latitude and longitude' })
  }

  try {
    const query = 'SELECT * FROM schools'
    const result = await pool.query(query)

    const schools = result.rows.map(school => ({
      ...school,
      distance: getDistance(lat, lon, school.latitude, school.longitude)
    }))

    schools.sort((a, b) => a.distance - b.distance)

    res.status(200).json({ schools })
  } catch (error) {
    console.error('... Error fetching schools', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { AddSchool, ListSchools }
