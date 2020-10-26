const gitSemverTags = require('git-semver-tags')
const semver = require('semver')

module.exports = function (args) {
  return new Promise((resolve, reject) => {
    gitSemverTags({tagPrefix: args.tagPrefix}, function (err, tags) {
      if (err) return reject(err)
      else if (!tags.length) {
        args.firstRelease = true;
        return resolve('1.0.0')
      }
      if (args.tagPrefix) {
        tags = tags.map(tag => tag.slice(args.tagPrefix.length))
        if (tags.length === 0) {
          args.firstRelease = true;
          return resolve('1.0.0')
        }
      }
      // ensure that the largest semver tag is at the head.
      tags = tags.map(tag => { return semver.clean(tag) })
      tags.sort(semver.rcompare)
      return resolve(tags[0])
    })
  })
}
