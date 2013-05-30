//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Enumeration constants for VSFlexGrid Pro 6.0
//
//enum ClearWhatSettings 
//{
	var flexClearEverything =0;
	var flexClearText =1;
	var flexClearFormatting =2;
	var flexClearData =3;
//};

//enum ClearWhereSettings 
//{
	var flexClearEverywhere =0;
	var flexClearScrollable =1;
	var flexClearSelection =2;
//};

//enum AppearanceSettings 
//{
    var flexFlat =0;
    var flex3D =1;
//};

//enum BorderStyleSettings 
//{
    var flexBorderNone =0;
    var flexBorderFlat =1;
//};

//enum MousePointerSettings 
//{
    var flexDefault =0;
    var flexArrow =1;
    var flexCross =2;
    var flexIBeam =3;
    var flexIcon =4;
    var flexSize =5;
    var flexSizeNESW =6;
    var flexSizeNS =7;
    var flexSizeNWSE =8;
    var flexSizeEW =9;
    var flexUpArrow =10;
    var flexHourglass =11;
    var flexNoDrop =12;
    var flexArrowHourGlass =13;
    var flexArrowQuestion =14;
    var flexSizeAll =15;
    var flexCustom = 99;
//};

//enum RowStatusSettings 
//{
	var flexrsNew =0;
	var flexrsUpdated =1;
	var flexrsModified =2;
	var flexrsDeleted =3;
//};

//enum CellPropertySettings 
//{
	var flexcpText =0;
	var flexcpTextStyle =1;
	var flexcpAlignment =2;
	var flexcpPicture =3;
	var flexcpPictureAlignment =4;
	var flexcpChecked =5;
	var flexcpBackColor =6;
	var flexcpForeColor =7;
	var flexcpFloodPercent =8;
	var flexcpFloodColor =9;
	var flexcpFont =10;
	var flexcpFontName =11;
	var flexcpFontSize =12;
	var flexcpFontBold =13;
	var flexcpFontItalic =14;
	var flexcpFontUnderline =15;
	var flexcpFontStrikethru =16;
	var flexcpFontWidth =17;
	var flexcpValue =18;
	var flexcpTextDisplay =19;
	var flexcpData =20;
	var flexcpCustomFormat =21;
	var flexcpLeft =22;	//Returns a cell's left coordinatethis. in twipsthis. taking merging into account (read-only).
	var flexcpTop =23;	//Returns a cell's top coordinatethis. in twipsthis. taking merging into account (read-only).
	var flexcpWidth	=24;	//Returns a cell's widththis. in twipsthis. taking merging into account (read-only).
	var flexcpHeight =25;	//Returns a cell's heightthis. in twipsthis. taking merging into account (read-only).
	var flexcpVariantValue =26;	//Returns a double if the cell contains a numeric value or a string otherwise (read-only).
	var flexcpRefresh =27;	//Set to True to force a cell or range to be repainted.
//};

//enum ExplorerBarSettings 
//{
	var flexExNone =0;
	var flexExSort =1;
	var flexExMove =2;
	var flexExSortAndMove =3;
//};

//enum AutoSearchSettings 
//{
	var flexSearchNone =0;
	var flexSearchFromTop =1;
	var flexSearchFromCursor =2;
//};

//enum MergeCompareSettings 
//{
	var flexMCExact =0;
	var flexMCNoCase =1;
	var flexMCTrimNoCase =2;
//};

//enum EllipsisSettings 
//{
	var flexNoEllipsis =0;
	var flexEllipsisEnd =1;
	var flexEllipsisPath =2;
//};

//enum CellCheckedSettings 
//{
	var flexNoCheckbox =0;
	var flexChecked =1;
	var flexUnchecked =2;
//};

//enum TabBehaviorSettings 
//{
    var flexTabControls =0;
    var flexTabCells =1;
//};

//enum SaveLoadSettings 
//{
    var flexFileAll =0;
    var flexFileData =1;
    var flexFileFormat =2;
    var flexFileCommaText =3;
    var flexFileTabText =4;
//};

//enum ArchiveSettings 
//{
	var arcAdd =0;
	var arcStore =1;
	var arcExtract =2;
	var arcDelete =3;
//};

//enum ArchiveInfoSettings 
//{
	var arcFileCount =0;
	var arcFileName =1;
	var arcFileSize =2;
	var arcFileCompressedSize =3;
	var arcFileDate =4;
//};

//enum OLEDragModeSettings 
//{
    var flexOLEDragManual =0;
    var flexOLEDragAutomatic =1;
//};

//enum OLEDropModeSettings 
//{
    var flexOLEDropNone =0;
    var flexOLEDropManual =1;
    var flexOLEDropAutomatic =2;
//};

//enum DataModeSettings 
//{
    var flexDMFree =0;
    var flexDMBound =1;
//};

//enum OwnerDrawSettings 
//{
    var flexODNone =0;
    var flexODOver =1;
    var flexODContent =2;
    var flexODComplete =3;
    var flexODOverFixed =4;
    var flexODContentFixed =5;
    var flexODCompleteFixed =6;
//};

//enum DataTypeSettings 
//{
	var flexDTEmpty = 0;
	var flexDTShort = 2;
	var flexDTLong = 3;
	var flexDTSingle = 4;
	var flexDTDouble = 5;
	var flexDTCurrency = 6;
	var flexDTDate = 7;
	var flexDTString = 8;
	var flexDTBoolean = 11;
	var flexDTLong8 = 20;
	var flexDTStringC = 30;
	var flexDTStringW = 31;
//};

//enum AutoSizeSettings 
//{
    var flexAutoSizeColWidth =0;
    var flexAutoSizeRowHeight =1;
//};

//enum CollapsedSettings 
//{
    var flexOutlineExpanded =0;
    var flexOutlineSubtotals =1;
    var flexOutlineCollapsed =2;
//};

//enum OutlineBarSettings 
//{
    var flexOutlineBarNone =0;
    var flexOutlineBarComplete =1;
    var flexOutlineBarSimple =2;
    var flexOutlineBarSymbols =3;
//};

//enum SubtotalSettings 
//{
    var flexSTNone =0;
    var flexSTClear =1;
    var flexSTSum =2;
    var flexSTPercent =3;
    var flexSTCount =4;
    var flexSTAverage =5;
    var flexSTMax =6;
    var flexSTMin =7;
    var flexSTStd =8;
    var flexSTVar =9;
//};

//enum SortSettings 
//{
    var flexSortNone =0;
    var flexSortGenericAscending =1;
    var flexSortGenericDescending =2;
    var flexSortNumericAscending =3;
    var flexSortNumericDescending =4;
    var flexSortStringNoCaseAscending =5;
    var flexSortStringNoCaseDescending =6;
    var flexSortStringAscending =7;
    var flexSortStringDescending =8;
    var flexSortCustom =9;
    var flexSortUseColSort =10;
//};

//enum FocusRectSettings 
//{
    var flexFocusNone =0;
    var flexFocusLight =1;
    var flexFocusHeavy =2;
    var flexFocusSolid =3;
    var flexFocusRaised =4;
    var flexFocusInset =5;
//};

//enum ShowSelSettings 
//{
    var flexHighlightNever =0;
    var flexHighlightAlways =1;
    var flexHighlightWithFocus =2;
//};

//enum ScrollBarsSettings 
//{
    var flexScrollBarNone =0;
    var flexScrollBarHorizontal =1;
    var flexScrollBarVertical =2;
    var flexScrollBarBoth =3;
//};

//enum TextStyleSettings 
//{ 
    var flexTextFlat =0;
    var flexTextRaised =1;
    var flexTextInset =2;
    var flexTextRaisedLight =3;
    var flexTextInsetLight =4;
//};

//enum FillStyleSettings 
//{
    var flexFillSingle =0;
    var flexFillRepeat =1;
//};

//enum GridStyleSettings 
//{
    var flexGridNone =0;
    var flexGridFlat =1;
    var flexGridInset =2;
    var flexGridRaised =3;
    var flexGridFlatHorz =4;
    var flexGridInsetHorz =5;
    var flexGridRaisedHorz =6;
    var flexGridSkipHorz =7;
    var flexGridFlatVert =8;
    var flexGridInsetVert =9;
    var flexGridRaisedVert =10;
    var flexGridSkipVert =11;
    var flexGridExplorer =12;
//};

//enum SelModeSettings 
//{
    var flexSelectionFree =0;
    var flexSelectionByRow =1;
    var flexSelectionByColumn =2;
    var flexSelectionListBox =3;
//};

//enum MergeSettings 
//{
    var flexMergeNever =0;
    var flexMergeFree =1;
    var flexMergeRestrictRows =2;
    var flexMergeRestrictColumns =3;
    var flexMergeRestrictAll =4;
    var flexMergeFixedOnly =5;
    var flexMergeSpill =6;
//};

//enum PictureTypeSettings 
//{
    var flexPictureColor =0;
    var flexPictureMonochrome =1;
//};

//enum AllowUserResizeSettings 
//{
    var flexResizeNone =0;
    var flexResizeColumns =1;
    var flexResizeRows =2;
    var flexResizeBoth =3;
//};

//enum SubtotalPositionSettings 
//{
    var flexSTBelow =0;
    var flexSTAbove =1;
//};

//enum AlignmentSettings 
//{
    var flexAlignLeftTop =0;
    var flexAlignLeftCenter =1;
    var flexAlignLeftBottom =2;
    var flexAlignCenterTop =3;
    var flexAlignCenterCenter =4;
    var flexAlignCenterBottom =5;
    var flexAlignRightTop =6;
    var flexAlignRightCenter =7;
    var flexAlignRightBottom =8;
    var flexAlignGeneral =9;
//};

//enum PictureAlignmentSettings 
//{
    var flexPicAlignLeftTop =0;
    var flexPicAlignLeftCenter =1;
    var flexPicAlignLeftBottom =2;
    var flexPicAlignCenterTop =3;
    var flexPicAlignCenterCenter =4;
    var flexPicAlignCenterBottom =5;
    var flexPicAlignRightTop =6;
    var flexPicAlignRightCenter =7;
    var flexPicAlignRightBottom =8;
    var flexPicAlignStretch =9;
    var flexPicAlignTile =10;
//};

//enum StringErrorSettings 
//{
    var flexErrNone =0;
    var flexErrOutOfMemory =1;
    var flexErrSquareB =2;
    var flexErrCurlyB =3;
    var flexErrBadPattern =4;
    var flexErrBadTagIndex =5;
    var flexErrNoMatch =6;
    var flexErrInvalidMatchIndex =7;
//};

//enum AllowUserFreezing
//{
	var flexFreezeNone =0;	//The user cannot change the number of frozen rows or columns.
	var flexFreezeColumns =1;	//The user can change the number of frozen columns.
	var flexFreezeRows =2;	//The user can change the number of frozen rows.
	var flexFreezeBoth =3;	//The user can change the number of frozen rows and columns.
//};

//enum  EditableSettings 
//{
	var flexEDNone	=0;	//The grid contents cannot be edited by the user.
	var flexEDKbd	=1;	//The user may initiate edit mode by typing into the current cell.
	var flexEDKbdMouse	=2;	//The user may initiate edit mode by typing into the current cell or by double-clicking it with the mouse.
	//True        	-1	Equivalent to flexEDKbd. This setting is used only to keep compatibility with earlier versions of the control.
//};
