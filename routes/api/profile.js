const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');


//@route GET api/profile/me
//@desc Get currents users profile
//@access Private
router.get('/me',auth, async(req,res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar'] );
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route Post api/profile
//@desc Create or update user porfile
//@access Private
router.post('/',

    [
        auth,
        [
            check('status','Status is required')
            .not()
            .isEmpty(),
            check('skills','Skills is required')
            .not()
            .isEmpty()
        ]
    ],
    async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array () });
        }
            // destructure the request
        const {
            website,
            skills,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
            // spread the rest of the fields we don't need to check
            ...rest
        } = req.body;

        //Build Profile
        const profileFields ={};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills){
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        console.log(skills);
        res.send('Hello')
    }
)

module.exports = router;