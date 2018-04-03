import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortId from 'shortid';
export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor
        .publish('links', function () {
            return Links.find({userId: this.userId});
        })
}

Meteor.methods({
    'links.insert' (url) {
        if (!this.userId) {
            throw new Meteor.Error(401, "Access is denied due to invalid credentials.");
        }
        new SimpleSchema({
            url: {
                label: 'Your link',
                type: String,
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({url: url});

        Links.insert({
            _id: shortId.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.getLink' (id) {
        if (!id) {
            throw new Meteor.Error(400, "Bad Request");
        }
        return Links.findOne({_id: id});
    },
    'links.setVisibility' (id, visibility) {
        if (!this.userId) {
            throw new Meteor.Error(401, "Access is denied due to invalid credentials.");
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({_id: id, visible: visibility});
        return Links.update({
            _id: id,
            userId: this.userId
        }, {
            $set: {
                visible: visibility
            }
        });
    },
    'links.trackVisit' (id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id: id});
        return Links.update({
            _id: id
        }, {
            $inc: {
                visitedCount: 1
            },
            $set:{
                lastVisitedAt:new Date().getTime()
            }
        });
    },
    'links.delete'(id){
        if (!this.userId) {
            throw new Meteor.Error(401, "Access is denied due to invalid credentials.");
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id: id});

        return Links.remove({_id:id,userId:this.userId});
    }
    //
})