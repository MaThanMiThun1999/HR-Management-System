const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/authMiddleware');

router.get('/weekly', auth, async (req, res) => {
    try {
        const weeklyData = await Attendance.aggregate([
            {
                $project: {
                    week: { $isoWeek: "$date" },
                    year: { $isoWeekYear: "$date" },
                    status: 1
                }
            },
            {
                $group: {
                    _id: { week: "$week", year: "$year", status: "$status" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: { week: "$_id.week", year: "$_id.year" },
                    present: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "present"] }, "$count", 0]
                        }
                    },
                    absent: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "absent"] }, "$count", 0]
                        }
                    },
                    casual_leave: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "casual_leave"] }, "$count", 0]
                        }
                    },
                    medical_leave: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "medical_leave"] }, "$count", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    week: { $concat: [{ $toString: "$_id.year" }, "-W", { $toString: "$_id.week" }] },
                    present: 1,
                    absent: 1,
                    casual_leave: 1,
                    medical_leave: 1
                }
            },
            {
                $sort: { week: 1 }
            }
        ]);
       
        res.json(weeklyData);
    } catch (error) {
  
        res.status(500).send('Server Error');
    }
});

module.exports = router;
