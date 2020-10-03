# video-parser

Смотреть тут: https://alfimois.github.io/video-parser/

### Одностраничное приложение (HTML + JavaScript(ES5) + CSS) для отображения и просмотра списка видео с youtube.com.

Приложению передается список идентификаторов видео (VIDEO_ID), разделенных запятой или пробелом, в GET параметре "id".

Список VIDEO_ID для примера:

`sw-l5SW5hik,2jSWMme12ik,p8npDG2ulKQ,pl-DjiO8das,CJRw18MtRPg,Wpm07-BGJnE,xf4iv4ic70M,6Q0AazVu1Tc,Xyb1fsPG-Xk,kG41zm8HGSE,RxvcH25WThg,df7PZIVe1lw,sYvH7Y16iUM,juTa0fPI22M,2KuqjW0WtZg,dKccvk36atQ,Duc3F700lgE,TI5bEf-BULU,sxyotaytAS0,UZ47aQFp2TQ,qD2yyikDcDw,O4_JNAFClFk,iJz5jURaEBc,RBbkCEHBw_I,CX11yw6YL1w`

Каждый VIDEO_ID имеет длину 11 символов и может содержать символы: a-z, A-Z, 0-9, -, _.

Пример запроса: `https://alfimois.github.io/savefrom-video-parser/?id=sw-l5SW5hik,2jSWMme12ik,p8npDG2ulKQ`
