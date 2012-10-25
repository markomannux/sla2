function buildSentence(sentenceParts, form) {
  if (!form) {
    form = 'albertese';
  }
  var subject = sentenceParts.subject
  var verb = sentenceParts.verb
  var obj = sentenceParts.obj
  var adjective1 = sentenceParts.adjective1
  var adjective2 = sentenceParts.adjective2
  var body = selectArticoloDet(adjective1[form][subject[form].genere], subject[form].genere) + " " + adjective1[form][subject[form].genere] + " " + subject[form].nome + " " + verb[form].presente + " " + selectArticoloInd(adjective2[form][obj[form].genere], obj[form].genere) + " " + adjective2[form][obj[form].genere] + " " + obj[form].nome;

  body = body.charAt(0).toUpperCase() + body.slice(1) + ".";
  return body;
};

function selectArticoloDet(parola, genere) {
  if (startsWithVowel(parola)) {
    return "l'";
  } else if (genere == "M") {
    return "il";
  } else {
    return "la";
  }
};

function selectArticoloInd(parola, genere) {
  if (startsWithVowel(parola)) {
    if (genere == "M") {
      return "un";
    } else {
      return "un'";
    }

  } else if (genere == "M") {
    return "un";
  } else {
    return "una";
  }
};

function startsWithVowel(word) {
  var initial = ['a', 'e', 'i', 'o', 'u'].indexOf(word.charAt(0));
  return initial > -1;
};

exports.buildSentence = buildSentence;
