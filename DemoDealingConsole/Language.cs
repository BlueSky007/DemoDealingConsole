using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using System.Xml;
using iExchange.Common;

namespace iExchange.DealingConsole
{
    public class Language
    {
        private Language()
        {
        }

        public static Hashtable GetLanguage(string childNodeName)
        {
            Hashtable language = new Hashtable();
            try
            {
                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.LoadXml(Language.LanguageXml);
                XmlNode xmlNode = xmlDocument["Languages"][childNodeName];
                foreach (XmlNode xmlNode2 in xmlNode.ChildNodes)
                {
                    language[xmlNode2.Name] = xmlNode2.InnerText;
                }
                return language;
            }
            catch (System.Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.Language.GetLanguage", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return language;       
        }

        private static string LanguageXml
        {
            get
            {
                return @"<?xml version='1.0' ?>
                <Languages>
                    <AccountStatus>
                        <ReportPageTypeQuery>Report Order Enquire Query</ReportPageTypeQuery>
                        <SelectAccount>Please select an account.</SelectAccount>
                        <PrinterError>Printer''s I/O was error! please check your printer.</PrinterError>
                        <QueryType>Report Account Status Query</QueryType>
                        <ChangePrice>Change Price</ChangePrice>
                        <Query>Query</Query>
                        <UseMarketPrice>Use Market price</UseMarketPrice>
                        <UserPrice>User price</UserPrice>
                        <Print>Print</Print>
                        <AccountCode>A/C Code</AccountCode>
                        <TradeDay>Trade Day</TradeDay>
                        <Currency>Currency</Currency>
                        <IsMultiCur>Is Multi Cur</IsMultiCur>
                        <AccountName>A/C Name</AccountName>
                        <Employee>A/E Code</Employee>
                        <AccountGroup>Account Group</AccountGroup>
                        <Organization>Organization</Organization>
                        <CrLot>Cr Lot</CrLot>
                        <StartDate>Start Date</StartDate>
                        <SMAmount>SM Amount SM</SMAmount>
                        <Credit>Credit</Credit>
                        <Uncleared>Uncleared</Uncleared>
                        <AccountDescription>Telephone Pin</AccountDescription>
                        <Call>Call</Call>
                        <NotValue>Not Valued Bal</NotValue>
                        <Balance>Balance</Balance>
                        <Equity>Equity</Equity>
                        <Necessary>Necessary</Necessary>
                        <Usable>Usable</Usable>
                        <Floating>Floating</Floating>
                        <Ratio>Ratio</Ratio>
                        <ONNecessary>ON Necessary</ONNecessary>
                        <ONUsable>ON Usable</ONUsable>
                        <Deposit>Deposit</Deposit>
                        <Adjustment>Adjustment</Adjustment>
                        <Level>Position Summary</Level>
                        <NoOpenPosition>No Open Position</NoOpenPosition>
                        <FullyHedge>Fully Hedge</FullyHedge>
                        <CallPrice>Call Price</CallPrice>
                        <CutPrice>Cut Price</CutPrice>
                        <LevelInstrument>Instrument</LevelInstrument>
                        <LevelPL>P/L</LevelPL>
                        <LevelNetLot>Net Lot</LevelNetLot>
                        <LevelBuy>BUY</LevelBuy>
                        <LevelSell>SELL</LevelSell>
                        <LevelRateIn>RateIn</LevelRateIn>
                        <LevelRateOut>RateOut</LevelRateOut>
                        <LevelLot>Lot</LevelLot>
                        <LevelAverage>Average</LevelAverage>
                        <OpenList>Open List</OpenList>
                        <CurrentTradeDayOrderList>Current Trade Day Order List</CurrentTradeDayOrderList>
                        <Date>Date</Date>
                        <OrderCode>Order Code</OrderCode>
                        <Item>Item</Item>
                        <BuySell>B/S</BuySell>
                        <Lot>Lot</Lot>
                        <Price>Price</Price>
                        <RefPrice>Ref</RefPrice>
                        <Commission>Comm.</Commission>
                        <Levy>Levy</Levy>
                        <Interest>Interest</Interest>
                        <Storage>Storage</Storage>
                        <TradePL>Trade P/L</TradePL>
                        <RateIn>In</RateIn>
                        <RateOut>Out</RateOut>

                        <ExecuteTime>Execute Time</ExecuteTime>
                        <InstrumentCode>Item</InstrumentCode>
                        <IsOpen>N/C</IsOpen>
                        <IsBuy>B/S</IsBuy>
                        <ExecutePrice>Price</ExecutePrice>
                        <ContractSize>C.Size</ContractSize>
                        <OrderTypeID>Type</OrderTypeID>
                        <OpenPosition>Position</OpenPosition>
                        <Dealer>Dealer</Dealer>
                        <SubmitTime>Submit Time</SubmitTime>
                        <SetPrice>Set Price</SetPrice>
                        <LotBalance>Lot Bal.</LotBalance>
                        <EndTime>End Time</EndTime>
                    </AccountStatus>	
                    </Languages>";
            }
        }
    }
}