function TradeDay(row)
{
	if(row)
	{
		this.tradeDay = row("tradeDay");
		this.beginTime = row("beginTime");
		this.endTime = row("endTime");
	}
}
