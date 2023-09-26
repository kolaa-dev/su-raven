---
title: {{ replace .Name "-" " " | title }}
date: {{ .Date }}
draft: false
Url: {{ printf "/%s" (replace .Name "-" " " | title) }}
article: {{ replace .Name "-" " " | title }}
---

