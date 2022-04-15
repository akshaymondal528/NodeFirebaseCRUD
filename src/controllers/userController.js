
const bcrypt = require('bcrypt');
const { collection, Timestamp, query, onSnapshot, orderBy, setDoc, getDoc, doc, deleteDoc } = require('firebase/firestore');
const { v4: uuidv4 } = require('uuid');

const db = require('../database/db');
const User = require('../models/userModel');

class userController {
    constructor() {
        return {
            userCreate: this.userCreate.bind(this),
            userReadAll: this.userReadAll.bind(this),
            userRead: this.userRead.bind(this),
            userUpdate: this.userUpdate.bind(this),
            userDelete: this.userDelete.bind(this),
        }
    }

    /**
     * @description    Create user
     * @routes         POST /create
     */
    async userCreate(req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);
            res.json({
                data: DocRef
            });
            let id = uuidv4()
            await setDoc(doc(db, 'users', id), {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                created: Timestamp.now(),
                updated: Timestamp.now()
            }, { merge: false });
            res.json({ message: 'create user successfully' });
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description    Get All user
     * @routes         GET /readall
     */
    async userReadAll(req, res, next) {
        try {
            const q = query(collection(db, 'users'), orderBy('created'));
            onSnapshot(q, (snapshot) => {
                res.json(snapshot.docs.map((doc) => doc.data()));
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description    Get user
     * @routes         GET /read/:id
     */
    async userRead(req, res, next) {
        try {
            const q = doc(db, 'users', req.params.id);
            const user = await getDoc(q);
            if (user.exists()) {
                res.json(user.data());
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description    Update user
     * @routes         PUT /update/:id
     */
    async userUpdate(req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);
            await setDoc(doc(db, 'users', req.params.id), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                updated: Timestamp.now()
            }, { merge: true });
            res.json({ message: 'update user successfully' });
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description    Delete user
     * @routes         DELETE /delete/:id
     */
    async userDelete(req, res, next) {
        try {
            const user = doc(db, 'users', req.params.id);
            await deleteDoc(user)
            res.json({ message: 'delete user successfully' });
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new userController();