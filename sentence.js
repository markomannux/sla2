function buildSentence(sentenceParts) {
  var subject = sentenceParts.subject
  var verb = sentenceParts.verb
  var obj = sentenceParts.obj
  var adjective1 = sentenceParts.adjective1
  var adjective2 = sentenceParts.adjective2
  var body = selectArticoloDet(adjective1[subject.genere], subject.genere) + " " + adjective1[subject.genere] + " " + subject.nome + " " + verb.presente + " " + selectArticoloInd(adjective2[obj.genere], obj.genere) + " " + adjective2[obj.genere] + " " + obj.nome;
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
