var express = require('express');
const db = require('../db/config');
var router = express.Router();

/**
 * @swagger
 * tags:
 *  name: School
 *  description: 학교
 */

/**
 * @swagger
 *  /api/school/cities:
 *    get:
 *      tags: [School]
 *      summary: 전국 시도 리스트 API
 *      produces:
 *      - "application/json; charset=utf-8"
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  "application/json; charset=utf-8":
 *                      schema:
 *                          type: list
 *                          properities:
 *                              school_location:
 *                                  type: string
 *                                  description: location 
 *          '404':
 *              description: Not Found!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      
 */
router.get('/cities',  (req, res, next) => {
    db.query(`SELECT DISTINCT school_location FROM school ORDER BY school_location`, (err, rows, fields) => {
        if(err) {
            next(err);
            return;
        }
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.send({
            'status': 'success',
            'code': 200,
            'data': {
                'city_list': rows.map(row => row['school_location'])
            },
            'message': null
        })
    });
});


/**
 * @swagger
 *  /api/school/location:
 *    get:
 *      tags: [School]
 *      summary: 해당 시/도에 위치한 학교 리스트 API
 *      produces:
 *      - "application/json; charset=utf-8"
 *      parameters:
 *          - in: query
 *            name: school_location
 *            schema:
 *              type: string
 *            required: true
 *            description: 시/도 이름
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  "application/json; charset=utf-8":
 *                      schema:
 *                          type: list
 *                          properities:
 *                              school_code:
 *                                  type: string
 *                                  description: 표준 학교 코드
 *                              school_name:
 *                                  type: string
 *                                  descipriont: 학교 이름 
  *          '404':
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

router.get(`/location`, (req, res, next) => {
    db.query(
        'SELECT school_code, school_name FROM school WHERE school_location = ?', [req.query.school_location], (err, rows, fields) => {
        if(err){
            next(err);
            return;
        }
        if(!rows.length){
            const error = new Error('No school in the city!');
            error.status = 404;
            next(error);
            return;
        }
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.send({
            'status': 'success',
            'code': 200,
            'data': {
                'school_list': rows
            },
            'message': null
        });
    })
});
  

module.exports = router;