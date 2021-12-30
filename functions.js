// initial setup pf firebase functions and firebase-admin
const functions = require("firebase-functions");
const firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp();

const algoliaSearch = require("algoliasearch");
const ALGOLIA_APP_ID = "KF0FHO1P8";
const ALGOLIA_ADMIN_KEY = "64f99127808dc828aaf31533b99686d9";
const ALGOLIA_SEARCH_ONLY_API_KEY = "e0f42d830622f307145b6d64b0b05598";
const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = algoliaClient.initIndex("dev_ispy");

function sanitisePostData(data) {
  return {
    active: data.active,
  };
}

exports.addPostToAlgoliaIndex = functions.firestore
  .document("/posts/{postId}")
  .onCreate((snapshot, context) => {
    const data = snapshot.data();
    // connect the objects together on the two platforms using
    // the firestore doc id as the id for each record on algolia
    const algoliaObjectId = snapshot.id;
    const sanitisedData = sanitisePostData(data);

    return algoliaIndex.saveObject({
      ...sanitisedData,
      objectID: algoliaObjectId,
    });
  });
