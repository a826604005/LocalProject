import $tpl from './index.html';

export default {
  abstract: true,
  templateProvider: $templateCache => $templateCache.get($tpl)
};
