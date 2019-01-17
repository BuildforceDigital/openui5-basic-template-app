/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/CalendarLegend","sap/ui/unified/CalendarLegendRenderer","sap/ui/core/library","sap/ui/unified/library","sap/base/Log"],function(e,a,t,i,r,d,s){"use strict";var n=d.CalendarDayType;var l=r.CalendarType;var o={};o.render=function(e,a){var t=this.getStartDate(a);var i=a.getTooltip_AsString();var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var d=a.getId();var s={value:d+"-Descr",append:true};var n=a.getWidth();e.write("<div");e.writeControlData(a);e.addClass(this.getClass(e,a));if(a._getSecondaryCalendarType()){e.addClass("sapUiCalMonthSecType")}e.writeClasses();if(i){e.writeAttributeEscaped("title",i)}if(a._getShowHeader()){s.value=s.value+" "+d+"-Head"}if(n){e.addStyle("width",n);e.writeStyles()}e.writeAccessibilityState(a,{role:"grid",readonly:"true",multiselectable:!a.getSingleSelection()||a.getIntervalSelection(),labelledby:s});e.write(">");e.write('<span id="'+d+'-Descr" style="display: none;">'+r.getText("CALENDAR_DIALOG")+"</span>");if(a.getIntervalSelection()){e.write('<span id="'+d+'-Start" style="display: none;">'+r.getText("CALENDAR_START_DATE")+"</span>");e.write('<span id="'+d+'-End" style="display: none;">'+r.getText("CALENDAR_END_DATE")+"</span>")}this.renderMonth(e,a,t);e.write("</div>")};o.getStartDate=function(e){return e._getDate()};o.getClass=function(e,a){var t="sapUiCalMonthView",i=a.getPrimaryCalendarType(),r=a.getShowWeekNumbers();if(i==l.Islamic||!r){t=t+" sapUiCalNoWeekNum"}return t};o.renderMonth=function(e,a,t){var i=a.getId();this.renderHeader(e,a,t);e.write('<div id="'+i+'-days" class="sapUiCalItems">');this.renderDays(e,a,t);e.write("</div>")};o.renderHeader=function(e,a,t){var i=a._getLocaleData();var r=a._getFirstDayOfWeek();var d=a.getId();var s=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this.renderHeaderLine(e,a,i,t);e.write("<div");e.writeAttribute("id",d+"-CW");e.addStyle("display","none");e.writeStyles();e.writeAccessibilityState(null,{role:"columnheader"});e.write(">");e.write(s.getText("CALENDAR_WEEK"));e.write("</div>");e.write("<div");e.writeAccessibilityState(null,{role:"row"});e.addStyle("overflow","hidden");e.writeStyles();e.write(">");this.renderDayNames(e,a,i,r,7,true,undefined);e.write("</div>")};o.renderHeaderLine=function(a,t,i,r){e._checkCalendarDate(r);if(t._getShowHeader()){var d=t.getId();var s=t.getPrimaryCalendarType();var n=i.getMonthsStandAlone("wide",s);a.write('<div id="'+d+'-Head"class="sapUiCalHeadText" >');a.write(n[r.getMonth()]);a.write("</div>")}};o.renderDayNames=function(e,a,t,i,r,d,s){var n=a._getFirstDayOfWeek();var l=a.getId();var o="";var y=a.getPrimaryCalendarType();var C=[];if(a._bLongWeekDays||!a._bNamesLengthChecked){C=t.getDaysStandAlone("abbreviated",y)}else{C=t.getDaysStandAlone("narrow",y)}var g=t.getDaysStandAlone("wide",y);for(var c=0;c<r;c++){e.write("<div");e.addClass("sapUiCalWH");if(d){o=l+"-WH"+(c+n)%7}else{o=l+"-WH"+c}e.writeAttribute("id",o);if(c==0){e.addClass("sapUiCalFirstWDay")}if(s){e.addStyle("width",s)}e.writeAccessibilityState(null,{role:"columnheader",label:g[(c+i)%7]});e.writeClasses();e.writeStyles();e.write(">");e.write(C[(c+i)%7]);e.write("</div>")}};o.renderDays=function(a,t,i){var r,d,s,n,o,y,C;e._checkCalendarDate(i);if(!i){i=t._getFocusedDate()}y=i.toUTCJSDate().getTime();if(!y&&y!==0){throw new Error("Date is invalid "+t)}n=this.getDayHelper(t,i);d=t._getVisibleDays(i,true);C=t.getShowWeekNumbers();r=t.getPrimaryCalendarType()!==l.Islamic&&C;s=d.length;for(o=0;o<s;o++){this.renderDay(a,t,d[o],n,true,r,-1)}};o.getDayHelper=function(e,i){var r,d,n=e._getLocaleData(),l={sLocale:e._getLocale(),oLocaleData:n,iMonth:i.getMonth(),iYear:i.getYear(),iFirstDayOfWeek:e._getFirstDayOfWeek(),iWeekendStart:n.getWeekendStart(),iWeekendEnd:n.getWeekendEnd(),aNonWorkingDays:e._getNonWorkingDays(),sToday:n.getRelativeDay(0),oToday:a.fromLocalJSDate(new Date,e.getPrimaryCalendarType()),sId:e.getId(),oFormatLong:e._getFormatLong(),sSecondaryCalendarType:e._getSecondaryCalendarType(),oLegend:undefined};d=e.getLegend();if(d&&typeof d==="string"){r=sap.ui.getCore().byId(d);if(r){if(!(r instanceof t)){throw new Error(r+" is not an sap.ui.unified.CalendarLegend. "+e)}l.oLegend=r}else{s.warning("CalendarLegend "+d+" does not exist!",e)}}return l};o.renderDay=function(t,r,d,s,l,o,y,C,g){e._checkCalendarDate(d);var c=new a(d,s.sSecondaryCalendarType),p={role:r._getAriaRole(),selected:false,label:"",describedby:""},w=d._bBeforeFirstYear,f="";var u=r._oFormatYyyymmdd.format(d.toUTCJSDate(),true);var b=d.getDay();var D=r._checkDateSelected(d);var S=r._getDateTypes(d);var v=r._checkDateEnabled(d);var m=0;if(w){v=false}var h=0;if(o){h=e.calculateWeekNumber(d.toUTCJSDate(),s.iYear,s.sLocale,s.oLocaleData);p["describedby"]=s.sId+"-CW"+" "+s.sId+"-WNum-"+h}if(!g){var W="";if(y<0){W=s.sId+"-WH"+b}else{W=s.sId+"-WH"+y}p["describedby"]=p["describedby"]+" "+W}t.write("<div");t.writeAttribute("id",s.sId+"-"+u);t.addClass("sapUiCalItem");t.addClass("sapUiCalWDay"+b);if(C){t.addStyle("width",C)}if(b==s.iFirstDayOfWeek){t.addClass("sapUiCalFirstWDay")}if(l&&s.iMonth!=d.getMonth()){t.addClass("sapUiCalItemOtherMonth");p["disabled"]=true}if(d.isSame(s.oToday)){t.addClass("sapUiCalItemNow");p["label"]=s.sToday+" "}if(D>0){t.addClass("sapUiCalItemSel");p["selected"]=true}else{p["selected"]=false}if(D==2){t.addClass("sapUiCalItemSelStart");p["describedby"]=p["describedby"]+" "+s.sId+"-Start"}else if(D==3){t.addClass("sapUiCalItemSelEnd");p["describedby"]=p["describedby"]+" "+s.sId+"-End"}else if(D==4){t.addClass("sapUiCalItemSelBetween")}else if(D==5){t.addClass("sapUiCalItemSelStart");t.addClass("sapUiCalItemSelEnd");p["describedby"]=p["describedby"]+" "+s.sId+"-Start";p["describedby"]=p["describedby"]+" "+s.sId+"-End"}S.forEach(function(e){if(e.type!=n.None){if(e.type===n.NonWorking){t.addClass("sapUiCalItemWeekEnd");return}t.addClass("sapUiCalItem"+e.type);f=e.type;if(e.tooltip){t.writeAttributeEscaped("title",e.tooltip)}}});if(r.getParent()&&r.getParent().getMetadata().getName()==="sap.ui.unified.CalendarOneMonthInterval"&&d.getMonth()!==r.getStartDate().getMonth()){t.addClass("sapUiCalItemOtherMonth")}if(!v){t.addClass("sapUiCalItemDsbl");p["disabled"]=true}if(s.aNonWorkingDays){for(m=0;m<s.aNonWorkingDays.length;m++){if(b==s.aNonWorkingDays[m]){t.addClass("sapUiCalItemWeekEnd");break}}}else if(b>=s.iWeekendStart&&b<=s.iWeekendEnd||s.iWeekendEnd<s.iWeekendStart&&(b>=s.iWeekendStart||b<=s.iWeekendEnd)){t.addClass("sapUiCalItemWeekEnd")}t.writeAttribute("tabindex","-1");t.writeAttribute("data-sap-day",u);if(g){p["label"]=p["label"]+s.aWeekDaysWide[b]+" "}p["label"]=p["label"]+s.oFormatLong.format(d.toUTCJSDate(),true);if(f!==""){i.addCalendarTypeAccInfo(p,f,s.oLegend)}if(s.sSecondaryCalendarType){p["label"]=p["label"]+" "+r._oFormatSecondaryLong.format(c.toUTCJSDate(),true)}t.writeAccessibilityState(null,p);t.writeClasses();t.writeStyles();t.write(">");t.write("<span");t.addClass("sapUiCalItemText");t.writeClasses();t.write(">");if(!w){t.write(d.getDate())}t.write("</span>");if(o&&b==s.iFirstDayOfWeek){t.write("<span");t.writeAttribute("id",s.sId+"-WNum-"+h);t.addClass("sapUiCalWeekNum");t.writeClasses();t.writeAccessibilityState(null,{role:"rowheader",desribedby:s.sId+"-CW"});t.write(">");t.write(h);t.write("</span>")}if(g){t.write("<span");t.addClass("sapUiCalDayName");t.writeClasses();t.write(">");t.write(s.aWeekDays[b]);t.write("</span>")}if(s.sSecondaryCalendarType){t.write("<span");t.addClass("sapUiCalItemSecText");t.writeClasses();t.write(">");t.write(c.getDate());t.write("</span>")}t.write("</div>")};return o},true);